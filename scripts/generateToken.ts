import { ensureDirectoryExists } from "@/lib/fileSystem";
import fs from "fs";
import path from "path";

/**
 * 디자인 토큰 타입 정의
 * ThemeValue: 문자열 또는 숫자 값
 * TokenCategory: 일반 토큰 또는 라이트/다크 모드를 가진 토큰
 * TokenStructure: 전체 토큰 구조
 */
type ThemeValue = string | number;
type TokenCategory =
  | Record<string, ThemeValue>
  | { light: Record<string, ThemeValue>; dark: Record<string, ThemeValue> };
type TokenStructure = Record<string, TokenCategory>;

// 설정 객체
const CONFIG = {
  // 토큰 파일 경로 (JSON)
  tokenPath: path.resolve(__dirname, "../token/token.json"),
  // 생성될 상수 파일 디렉토리
  output: {
    constants: path.resolve(__dirname, "../constants/"),
  },
} as const;

/**
 * 디렉토리와 그 내용을 삭제하는 함수
 */
function removeDirectory(dirPath: string) {
  if (fs.existsSync(dirPath)) {
    fs.readdirSync(dirPath).forEach((file) => {
      const curPath = path.join(dirPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        removeDirectory(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(dirPath);
  }
}

// 토큰 파일 읽기
const tokenContent = JSON.parse(
  fs.readFileSync(CONFIG.tokenPath, "utf8")
) as TokenStructure;
if (!tokenContent) {
  throw new Error("❌ 디자인 토큰 파일을 찾을 수 없습니다.");
}

/**
 * 컬러 카테고리 여부를 확인하는 타입 가드
 * light/dark 모드가 있는 경우 컬러 카테고리로 간주
 */
function isColorCategory(value: TokenCategory): value is {
  light: Record<string, ThemeValue>;
  dark: Record<string, ThemeValue>;
} {
  return typeof value === "object" && "light" in value && "dark" in value;
}

/**
 * 첫 글자를 대문자로 변환
 */
function firstLetterToUpperCase(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * 상수 생성 함수
 * @param category 카테고리명 (colors, spacing 등)
 * @param values 해당 카테고리의 값들
 */
function generateConstants(category: string, values: TokenCategory) {
  let variables = "";

  if (isColorCategory(values)) {
    // 컬러 카테고리인 경우 light/dark 객체 구조로 생성
    const lightValues = values.light;
    const darkValues = values.dark;

    variables += "    light: {\n";
    Object.entries(lightValues).forEach(([key, value]) => {
      variables += `        ${key}: '${value}',\n`;
    });
    variables += "    },\n";

    variables += "    dark: {\n";
    Object.entries(darkValues).forEach(([key, value]) => {
      variables += `        ${key}: '${value}',\n`;
    });
    variables += "    },\n";

    return variables;
  }

  // 일반 카테고리 처리
  Object.entries(values).forEach(([key, value]) => {
    // spacing, size, borderRadius는 숫자 값 그대로 사용
    // 나머지는 문자열로 처리
    const formattedValue =
      typeof value === "number"
        ? category === "spacing" ||
          category === "size" ||
          category === "borderRadius"
          ? value
          : value
        : `'${value}'`;
    variables += `    ${key}: ${formattedValue},\n`;
  });

  return variables;
}

try {
  // 기존 constants 디렉토리 제거
  removeDirectory(CONFIG.output.constants);
  console.log("✅ 기존 상수 디렉토리가 삭제되었습니다.");

  // 새로운 디렉토리 생성
  ensureDirectoryExists(CONFIG.output.constants);
  console.log("✅ 새로운 상수 디렉토리가 생성되었습니다.");

  // 각 카테고리별 상수 파일 생성
  Object.entries(tokenContent).forEach(([category, values]) => {
    // 파일 헤더 추가
    let constantsContent =
      "/* Auto-generated code. DO NOT modify directly. */\n" +
      "/* To make changes, edit src/token/token.json */\n\n";

    // 상수 생성 및 파일 작성
    const constants = generateConstants(category, values);
    constantsContent += `export const ${firstLetterToUpperCase(
      category
    )} = {\n${constants}} as const;`;

    fs.writeFileSync(
      `${CONFIG.output.constants}/${category}.ts`,
      constantsContent
    );
  });

  console.log("✅ 새로운 상수 파일이 생성되었습니다.");
} catch (error) {
  throw new Error(`❌ 토큰 생성 중 오류가 발생했습니다.\n${error}`);
}

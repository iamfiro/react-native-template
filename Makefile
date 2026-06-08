# ─── React Native + Expo Makefile ───────────────────────────────────────────

.DEFAULT_GOAL := help

# ─── Development ────────────────────────────────────────────────────────────

.PHONY: install
install: ## Install dependencies
	npm install

.PHONY: start
start: ## Start Expo dev server
	npx expo start

.PHONY: ios
ios: ## Start on iOS simulator
	npx expo start --ios

.PHONY: android
android: ## Start on Android emulator
	npx expo start --android

.PHONY: web
web: ## Start on web browser
	npx expo start --web

.PHONY: dev
dev: ## Start with cache cleared
	npx expo start --clear

# ─── Quality ────────────────────────────────────────────────────────────────

.PHONY: lint
lint: ## Run ESLint
	npx expo lint

.PHONY: lint-fix
lint-fix: ## Run ESLint with auto-fix
	npx expo lint --fix

.PHONY: format
format: ## Run Prettier
	npx prettier --write "**/*.{ts,tsx,js,jsx,json,md}"

.PHONY: format-check
format-check: ## Check Prettier formatting
	npx prettier --check "**/*.{ts,tsx,js,jsx,json,md}"

.PHONY: typecheck
typecheck: ## Run TypeScript type checking
	npx tsc --noEmit

.PHONY: test
test: ## Run tests in watch mode
	npx jest --watchAll

.PHONY: test-ci
test-ci: ## Run tests once (CI mode)
	npx jest --ci --coverage

.PHONY: check
check: lint typecheck test-ci ## Run all checks (lint + typecheck + test)

# ─── Build (EAS) ───────────────────────────────────────────────────────────

.PHONY: eas-init
eas-init: ## Initialize EAS project
	npx eas-cli init

.PHONY: build-ios-dev
build-ios-dev: ## EAS build iOS development
	npx eas-cli build --platform ios --profile development

.PHONY: build-android-dev
build-android-dev: ## EAS build Android development
	npx eas-cli build --platform android --profile development

.PHONY: build-ios-preview
build-ios-preview: ## EAS build iOS preview
	npx eas-cli build --platform ios --profile preview

.PHONY: build-android-preview
build-android-preview: ## EAS build Android preview
	npx eas-cli build --platform android --profile preview

.PHONY: build-ios-prod
build-ios-prod: ## EAS build iOS production
	npx eas-cli build --platform ios --profile production

.PHONY: build-android-prod
build-android-prod: ## EAS build Android production
	npx eas-cli build --platform android --profile production

.PHONY: build-all-prod
build-all-prod: ## EAS build all platforms production
	npx eas-cli build --platform all --profile production

# ─── Deploy (EAS Submit + Update) ──────────────────────────────────────────

.PHONY: submit-ios
submit-ios: ## Submit iOS build to App Store
	npx eas-cli submit --platform ios

.PHONY: submit-android
submit-android: ## Submit Android build to Play Store
	npx eas-cli submit --platform android

.PHONY: update
update: ## Publish OTA update (production)
	npx eas-cli update --branch production

.PHONY: update-preview
update-preview: ## Publish OTA update (preview)
	npx eas-cli update --branch preview

# ─── Codegen & Utilities ───────────────────────────────────────────────────

.PHONY: prebuild
prebuild: ## Generate native projects (ios/android)
	npx expo prebuild

.PHONY: prebuild-clean
prebuild-clean: ## Regenerate native projects from scratch
	npx expo prebuild --clean

.PHONY: reset
reset: ## Reset project (run reset script)
	node ./scripts/reset-project.js

.PHONY: clean
clean: ## Clean build artifacts and caches
	rm -rf node_modules/.cache
	rm -rf .expo
	rm -rf ios/build android/app/build
	watchman watch-del-all 2>/dev/null || true

.PHONY: nuke
nuke: ## Full clean + reinstall
	rm -rf node_modules
	rm -rf .expo
	rm -rf ios android
	npm install

# ─── Help ──────────────────────────────────────────────────────────────────

.PHONY: help
help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

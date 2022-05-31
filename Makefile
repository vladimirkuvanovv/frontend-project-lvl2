install:
	npm ci

publish:
	npm publish --dry-run

lint-fix:
	npx eslint --fix .

lint:
	yarn run eslint .

test:
	npm test

test-local:
	npx jest --watch

test-coverage:
	npm test -- --coverage --coverageProvider=v8
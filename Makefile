install-deps:
	npm ci
	npm link

publish:
	npm publish --dry-run

lint-fix:
	npx eslint --fix .

lint:
	npx eslint .

link:
	npm link

test:
	npm test

test-watch:
	npx jest --watch

test-coverage:
	npm test -- --coverage --coverageProvider=v8
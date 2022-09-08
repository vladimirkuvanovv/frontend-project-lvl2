### Hexlet tests and linter status:

[![Actions Status](https://github.com/vladimirkuvanovv/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/vladimirkuvanovv/frontend-project-lvl2/actions)

[![Maintainability](https://api.codeclimate.com/v1/badges/9d4820423ab09b3e16a9/maintainability)](https://codeclimate.com/github/vladimirkuvanovv/frontend-project-lvl2/maintainability)

[![Test Coverage](https://api.codeclimate.com/v1/badges/9d4820423ab09b3e16a9/test_coverage)](https://codeclimate.com/github/vladimirkuvanovv/frontend-project-lvl2/test_coverage)

[![Compare files](https://github.com/vladimirkuvanovv/frontend-project-lvl2/actions/workflows/compare-files.yml/badge.svg)](https://github.com/vladimirkuvanovv/frontend-project-lvl2/actions/workflows/compare-files.yml)



# Description

It is a CLI program for show differences between two files in three different formats.

Stack: Node.js, Commander.js, npm, JEST, ESLint, Git, GitHub.

# Installation

```sh
$ git clone git@github.com:vladimirkuvanovv/frontend-project-lvl2.git

$ cd frontend-project-lvl2

$ make install-deps
```

# Run tests

```sh
$ make test
```

# Usage

This utility can be used as a script in terminal or a library in a project.

```sh
$ gendiff -h
Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
  -V, --version          output the version number
  -f, --format <type>    output format (choices: "stylish", "plain", "json", default: "stylish")
  -h, --help             display help for command
```

# Use in a project

```sh
import genDiff from '@hexlet/code';
const diff = genDiff(filepath1, filepath2, format);
console.log(diff);
```

# Demonstration of the work 

### Compare pretty json files:

[![asciicast](https://asciinema.org/a/J7BcnO4nDSDTPg3VRlEOObq0i.svg)](https://asciinema.org/a/J7BcnO4nDSDTPg3VRlEOObq0i)

### Compare yml files:

[![asciicast](https://asciinema.org/a/Cc5dU7TXxEw5GGH7gkHZC5DUc.svg)](https://asciinema.org/a/Cc5dU7TXxEw5GGH7gkHZC5DUc)

### Compare nested json and yml files in stylish format:

[![asciicast](https://asciinema.org/a/GC3pI8XF5kVRFB9OQ2CpFH09m.svg)](https://asciinema.org/a/GC3pI8XF5kVRFB9OQ2CpFH09m)

### Compare nested files in plain format:

[![asciicast](https://asciinema.org/a/Ojqt5YmjIENXmWyONmGJvs8K2.svg)](https://asciinema.org/a/Ojqt5YmjIENXmWyONmGJvs8K2)

### Compare nested files in json format:

[![asciicast](https://asciinema.org/a/3lQdKQLNlH1QflF5prOWAn206.svg)](https://asciinema.org/a/3lQdKQLNlH1QflF5prOWAn206)
#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from '../src/genDiff.js';
import path from 'path';

const program = new Command();

program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0')
    .argument('<filepath1>')
    .argument('<filepath2>')
    .option('-f, --format <type>', 'output format', 'json')
    .action((filepath1, filepath2) => {
      genDiff(filepath1, filepath2);
    })
    .parse();

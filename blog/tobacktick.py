#!/usr/bin/env python
# encoding: utf-8

import sys

def helpfunc():
    print('A Python Script which can convert liquid highlight tags to backtick-style fenced code blocks.\n')
    print('Usage:\n')
    print('  python tobacktick.py <inputfile> [outputfile]\n')


def main():
    if len(sys.argv) < 2 or sys.argv[1]=='help':
        helpfunc()
        return

    input_fn = sys.argv[1]
    if len(sys.argv) < 3:
        output_fn = input_fn.split('.')[0]+'-converted.'+input_fn.split('.')[1]
    else:
        output_fn = sys.argv[2]

    with open(input_fn, 'r') as inputfile, open(output_fn, 'w') as outputfile:
        for line in inputfile:
            judge_condition = line.split()
            if len(judge_condition) > 1 and judge_condition[0] == r'{%':
                if judge_condition[1] == r'highlight':
                    identifier = judge_condition[2]
                    outputfile.write('\n```'+identifier+'\n')
                elif judge_condition[1] == r'endhighlight':
                    outputfile.write('```\n')
            else:
                outputfile.write(line)

        print('Complete! Saved to:' + output_fn)


if __name__ == '__main__':
    main()

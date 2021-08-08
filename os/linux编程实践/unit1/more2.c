#include <stdio.h>
#define PAGELEN 24  // 每一页的最大行数
#define LINELEN 512 // 每一行的最大读取字符数

void do_more(FILE *);
int see_more(FILE *);

// 解决 more1 的问题1和3
// 问题1解决：从标准输入流读取内容，从键盘设备(/dev/tty)直接读取用户输入。
// 对比原来：都是从标准输入读取，键盘设备的输入也是被系统读取到标准输入的。

// 问题2解决：关闭缓冲区，输入命令不用回车，直接被送往程序

int main(int ac, char *av[])
{
    FILE *fp;
    system("stty -icanon"); // 关闭缓冲区
    if (ac == 1)
    {
        do_more(stdin);
    }
    else
    {
        while (--ac)
        {
            fp = fopen(*++av, "r");
            if (fp != NULL)
            {
                do_more(fp);
                fclose(fp);
            }
        }
    }
    return 0;
}

/**
 * 按页读取内容
 **/
void do_more(FILE *fp)
{
    FILE *fp_tty = fopen("/dev/tty", "r");
    if (fp_tty == NULL)
        exit(1);
    char line[LINELEN]; // 当前读取的行
    int num_of_lines = 0;
    int reply;
    while (fgets(line, LINELEN, fp)) // 从fp读取LINELEN个字符，并将其放入到line数组
    {
        if (num_of_lines == PAGELEN) // 如果读取完本页，那么等待用户输入指示
        {
            reply = see_more(fp_tty);
            if (reply == 0)
                break;
            num_of_lines -= reply;
        }
        if (fputs(line, stdout) == EOF) // 将读取内容放入到标准输出中
            exit(1);
        num_of_lines++;
    }
}

/**
 * 从指定流中读取下一个字符
 **/
int see_more(FILE *fp)
{
    int c;
    printf("\033[7m more? \033[m");
    // getc: https://www.runoob.com/cprogramming/c-function-getc.html
    // 从指定的流 stream 获取下一个字符（一个无符号字符），并把位置标识符往前移动。
    while ((c = getc(fp)) != EOF)
    {
        if (c == 'q')
        {
            return 0;
        }
        if (c == ' ')
        {
            return PAGELEN;
        }
        if (c == '\n')
        {
            return 1;
        }
    }
    return 0;
}
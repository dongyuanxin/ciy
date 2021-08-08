#include <stdio.h>
#define PAGELEN 24  // 每一页的最大行数
#define LINELEN 512 // 每一行的最大读取字符数

void do_more(FILE *);
int see_more();

// 问题列表：
// 1、如果从标准输入流中读取，流中数据会自动被see_more的getchar读取到，从而代替用户操作直接运行
// 2、滚动时，more也会上下滚动
// 3、交互式输入时，必须按回车键，才会继续执行

int main(int ac, char *av[])
{
    FILE *fp;
    if (ac == 1)
    {
        // 如果没有文件参数，就从标准输入流中读取
        // 例如读取more1.c内容：cat more1.c | ./run.out
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
    char line[LINELEN]; // 当前读取的行
    int num_of_lines = 0;
    int reply;
    while (fgets(line, LINELEN, fp)) // 从fp读取LINELEN个字符，并将其放入到line数组
    {
        if (num_of_lines == PAGELEN) // 如果读取完本页，那么等待用户输入指示
        {
            reply = see_more();
            if (reply == 0)
            {
                break;
            }
            num_of_lines -= reply;
        }
        if (fputs(line, stdout) == EOF) // 将读取内容放入到标准输出中
        {
            exit(1);
        }
        num_of_lines++;
    }
}

/**
 * 从标准输入流中读取字符，并且返回标记。
 * 1、读取q：返回0，do_more中识别后退出程序
 * 2、读取空格：返回页最大行数，do_more中读取下一页
 * 3、读取换行：返回1，do_more读取下一行
 **/
int see_more()
{
    int c;
    printf("\033[7m more? \033[m");
    while ((c = getchar()) != EOF)
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
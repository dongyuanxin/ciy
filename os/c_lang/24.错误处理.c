#include <stdio.h>
#include <errno.h>
#include <string.h>

// 系统编程 C 语言不提供对错误处理的直接支持
// 错误表现：
//  在发生错误时，大多数的 C 或 UNIX 函数调用返回 1 或 NULL；
//  同时会设置一个错误代码 errno，该错误代码是全局变量，表示在函数调用期间发生了错误。
//  可以在 errno.h 中找到各种错误码。在程序初始化时，将errno设置为0，是种好习惯，代表没有错误。

// 常见显示 errno 错误信息的函数：
// 1、perror：显示您传给它的字符串，后跟一个冒号 + 一个空格 + 当前 errno 值的文本表示形式 （简单好用）
// 2、strerror：返回一个指针，指针指向当前 errno 值的文本表示形式。

extern int errno;

int main()
{
    FILE *pf;
    int errnum;
    pf = fopen("unexist.txt", "rb");
    if (pf == NULL)
    {
        errnum = errno;
        fprintf(stderr, "错误号: %d\n", errno);
        perror("通过 perror 输出错误");
        fprintf(stderr, "打开文件错误: %s\n", strerror(errnum));
        printf("打开文件错误: %s\n", strerror(errnum));
    }
    else
    {
        fclose(pf);
    }
    return 0;
}
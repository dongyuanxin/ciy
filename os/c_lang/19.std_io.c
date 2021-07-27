// 标准输入输出
#include <stdio.h>

// 参考链接：《scanf,getchar和gets的用法和区别_蓦~的博客-程序员宅基地_getchar》http://www.cxyzjd.com/article/weixin_44822001/104949645
// 这几个函数都是从内存缓存区读取的字符，而不是从键盘上读取的。键盘输入 => 存入到内存缓冲区
// 其中，gets 和 scanf 都会根据字符串做些特殊处理；getchar 不会，一次只读一个char，可以用它来循环，识别回车后结束程序。

// 特点总结：
// getchar 一次「一个」字符
// gets：一次「一行」字符，遇到回车结束，并且在字符后添加 \0
// scanf：能给多个变量赋值

void getchar_and_putchar(void);
void gets_and_puts(void);
void scanf_and_printf(void);

int main()
{
    gets_and_puts();
    return 0;
}

// int getchar(void)
// 函数从屏幕读取下一个可用的字符，并把它返回为一个整数。这个函数在同一个时间内只会读取一个单一的字符。您可以在循环内使用这个方法，以便从屏幕上读取多个字符。
// int putchar(int c)
// 函数把字符输出到屏幕上，并返回相同的字符。这个函数在同一个时间内只会输出一个单一的字符。您可以在循环内使用这个方法，以便在屏幕上输出多个字符。

// 不论输入多少个字符，最终输出的都一个字符。因为getchar只读一个，putchar只写一个。
void getchar_and_putchar(void)
{
    int c;

    printf("Enter a value :");
    c = getchar();

    printf("\nYou entered: ");
    putchar(c);
    printf("\n");
}

// char *gets(char *s) 函数从 stdin 读取一行到 s 所指向的缓冲区，直到一个终止符或 EOF。
// int puts(const char *s) 函数把字符串 s 和一个尾随的换行符写入到 stdout。

// MacOS C99 编译后的程序运行，会直接爆出 warning: this program uses gets(), which is unsafe.
void gets_and_puts(void)
{
    char str[100];

    printf("Enter a value :");
    gets(str);

    printf("\nYou entered: ");
    puts(str);
}

// int scanf(const char *format, ...) 函数从标准输入流 stdin 读取输入，并根据提供的 format 来浏览输入。
// 注意除了第一个参数，其他参数是指针。

// 另外写法-1：
//      char a[10];
//      scanf("%s",a);
// 另外写法-2：
//      char a;
//      scanf("%c",&a);

void scanf_and_printf(void)
{
    char str[100];
    int i;

    printf("Enter a value :");
    scanf("%s %d", str, &i);

    printf("\nYou entered: %s %d ", str, i);
    printf("\n");
}
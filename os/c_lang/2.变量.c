#include <stdio.h>
#include <float.h>

int x;
int y;

int addTwoNum()
{
    // 外部变量，声明但不开辟空间（和js全局变量不同）
    extern int x; // 其实是跨文件用。
    extern int y;

    x = 1;
    y = 2;
    return x + y;
}

int main(void)
{
    int result = addTwoNum();
    printf("result is %d \r\n", result);
    return 0;
}
#include <stdio.h>
#include <float.h>

// 指针的基本用法

int main()
{
    int runoob = 100;
    printf("runoob is %p\n", &runoob);

    // 赋为 NULL 值的指针被称为空指针。NULL 指针是一个定义在标准库中的值为零的常量
    int *ptr = NULL;
    printf("ptr 的地址是 %p\n", ptr);
    return 0;
}
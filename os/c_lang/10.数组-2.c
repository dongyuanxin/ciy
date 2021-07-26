#include <stdio.h>
#include <float.h>

void func3(int length, int param[]);

int main()
{

    int nums[] = {1, 2, 3, 4};
    func3(4, nums); // 打印 nums 数组
    return 0;
}

/**
 * 一、数组作为参数传递给函数
**/

// 数组参数可以传入数组指针
void func1(int *param) {}

// 数组参数可以传入指定长度数组
void func2(int param[5]) {}

// 数组参数可以传入未定义大小的数组
// 一般会多一个 length 用来指定长度。例如 int main(int argc, char *argv[]) {}
void func3(int length, int param[])
{
    printf(">>> nums are: ");
    for (int i = 0; i < length; ++i)
    {
        printf("%d, ", param[i]);
    }
    printf("\n");
}

/**
 * 二、数组作为函数返回
**/
// C 语言不允许返回一个完整的数组作为函数的返回。
// 因为 C 不支持在函数外返回局部变量的地址，除非定义局部变量为 static 变量（此时不再是栈上的局部地址，而是静态区中的地址变量）。

/* 要生成和返回随机数的函数 */
int *getRandom()
{
    static int r[10];
    int i;

    /* 设置种子 */
    srand((unsigned)time(NULL));
    for (i = 0; i < 10; ++i)
    {
        r[i] = rand();
        printf("r[%d] = %d\n", i, r[i]);
    }
    return r;
}
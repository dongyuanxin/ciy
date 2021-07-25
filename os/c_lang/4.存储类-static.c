#include <stdio.h>
#include <float.h>

// static 存储类指示编译器在程序的生命周期内保持局部变量的存在，而不需要在每次它进入和离开作用域时进行创建和销毁。
// 比如函数内声明的auto存储类，在函数运行时才会为变量创建空间，函数结束后，会销毁此变量。
// 而使用static存储类，并不会出现这问题。它一旦被创建，不会被自动销毁。

// static 可以用于全局变量。同时，对于全局变量，static是默认的。

void func1(void);

static int times = 10;

int main()
{
    while (times--)
    {
        func1();
    }
    return 0;
}

void func1(void)
{
    // num 是 func1 的局部变量，只会初始化一次；再次调用时，num 不会被重置
    // 所以这里输出的是： 1， 2， 3，...，10
    static int num = 0;
    num++;
    printf(">>> num is %d\n", num);
}
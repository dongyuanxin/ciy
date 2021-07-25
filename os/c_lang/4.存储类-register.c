#include <stdio.h>
#include <float.h>

// 《寄存器、RAM、ROM、CACHE、Flash相关概念区别整理》
// https://blog.csdn.net/BjarneCpp/article/details/79495336

// register 存储类用于定义存储在寄存器中而不是 RAM 中的局部变量。
// 这意味着变量的最大尺寸等于寄存器的大小（通常是一个词），且不能对它应用一元的 '&' 运算符（因为它没有内存位置）
//
int main()
{
    register int mount = 0;
    printf("mount is %d\n", mount);
    return 0;
}
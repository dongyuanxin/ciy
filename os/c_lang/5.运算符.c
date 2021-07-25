#include <stdio.h>
#include <float.h>

// sizeof() 返回变量大小。可以 sizeof(int) ，传入type
// & 返回变量的地址（即指针）

// * 目前有两个作用：
//  1、变量声明的时候，说明这个变量是个指针。例如 int *ptr
//  2、指向一个变量，即访问指针的地址。例如 *ptr 访问指针地址

int main()
{
    int a = 4;
    int *ptr = &a;

    printf("a is %d\n", *ptr);
}
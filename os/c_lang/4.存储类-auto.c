/**
 * 存储类定义 C 程序中变量/函数的范围（可见性）和生命周期。
 * 其实就是用于一些变量声明，附带一些奇怪的魔法属性。
 * 包括：
 * auto
 * register
 * static
 * extern
 * 
**/
#include <stdio.h>
#include <float.h>

// auto 存储类是所有局部变量「默认」的存储类。
int main()
{
    int mount = 0;
    auto int a_mount = 0;
    printf("mount is %d\n", mount);
    printf("a_mount is %d\n", a_mount);
    return 0;
}
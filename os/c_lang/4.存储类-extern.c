#include <stdio.h>
#include <float.h>

// extern 存储类用于提供一个全局变量的引用，全局变量对所有的程序文件都是可见的。
// 效果：当您使用 extern 时，对于无法初始化的变量，会把变量名指向一个之前定义过的存储位置。
//      这个过程编译器是自动寻找的。
// 场景：存在多个源码文件，如果某个文件想使用其他文件（可以理解成node的模块概念）的方法/属性，
//      那么此方法/属性可以用 extern 声明。
// 编译时：相关文件一起编译。例如这里就是：gcc for_extern.c 4.存储类-extern.c  -o run.out
// 注意：带有main方法的文件是主入口文件。

int count;
extern void write_extern();

int main()
{
    count = 5;
    write_extern();
}
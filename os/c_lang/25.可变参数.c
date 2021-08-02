#include <stdio.h>
#include <stdarg.h>
// 可变参数需要引入 stdarg.h 头文件
// 可变参数写法：... 三个点
double average(int num, ...)
{
    // step0: 声明存储可变参数的变量valist
    va_list valist;
    double sum = 0.0;
    int i;
    // step1: 初始化valist
    va_start(valist, num);
    // step2: 访问可变参数
    for (i = 0; i < num; ++i)
    {
        sum += va_arg(valist, int); // 按照int类型解析
    }
    // step3: 清理为 valist 保留的内存
    va_end(valist);
    return sum / num;
}

int main()
{
    printf("Average of 2, 3, 4, 5 = %f\n", average(4, 2, 3, 4, 5));
    printf("Average of 5, 10, 15 = %f\n", average(3, 5, 10, 15));
    return 0;
}
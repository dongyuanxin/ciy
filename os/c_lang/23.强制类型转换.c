#include <stdio.h>
// 注意：
// 请使用显式的强制类型转换：(type_name) expression

int main()
{
    int sum = 17, count = 5;
    double mean;
    // 显式类型转换：
    // 这里要注意的是强制类型转换运算符的优先级大于除法，
    // 因此 sum 的值首先被转换为 double 型，然后除以 count，得到一个类型为 double 的值。
    mean = (double)sum / count;
    printf("Value of mean : %f\n", mean);

    // 隐式类型转换
    // 隐式地把值强制转换为相同的类型。编译器首先执行整数提升，如果操作数类型不同，则它们会被转换为下列层次中出现的最高层次的类型
    // ![](https://tva1.sinaimg.cn/large/008i3skNgy1gt1o506qggj30630dndfw.jpg)
    int i = 17;
    char c = 'c'; /* ascii 值是 99 */
    int sum2;

    sum2 = i + c;
    printf("Value of sum2 : %d\n", sum2);
}
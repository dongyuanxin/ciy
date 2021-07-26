#include <stdio.h>
#include <float.h>

// 枚举是 C 语言中的一种基本数据类型，它可以让数据更简洁，更易读。

// 方法1: 定义枚举类型，之后再定义枚举变量
enum DAY1
{
    MON1 = 1,
    TUE1,
    WED1,
    THU1,
    FRI1,
    SAT1,
    SUN1
};
// 方法2: 定义枚举类型，同时定义枚举变量
enum DAY2
{
    MON2 = 1,
    TUE2,
    WED2,
    THU2,
    FRI2,
    SAT2,
    SUN2
} day2;
// 方法3: 省略枚举类型定义，只定义枚举变量
enum
{
    MON3 = 1,
    TUE3,
    WED3,
    THU3,
    FRI3,
    SAT3,
    SUN3
} day3;

int main()
{
    // 用法1: 使用 enum 变量
    enum DAY1 day1;
    day1 = MON1;
    printf("day1 is %d\n", day1);
    // 用法2: 遍历枚举元素
    // 按照 C 语言规范是没有办法遍历枚举类型的
    // 不过在一些特殊的情况下，枚举类型必须连续是可以实现有条件的遍历。
    for (day2 = MON2; day2 <= SUN2; ++day2)
    {
        printf("day2 is %d\n", day2);
    }
    printf("%u\n", &day1);
    return 0;
}
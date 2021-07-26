#include <stdio.h>
#include <float.h>

// 数组和高维数组读写

int main()
{    
    // 其他声明方法：
    //  int nums[4];
    //  int nums[4] = {1, 2, 3, 4};
    int nums[] = {1, 2, 3, 4};
    printf(">>> nums are: ");
    for (int i = 0; i < 4; ++i) {
        printf("%d, ", nums[i]);
    }
    printf("\n");

    // 多维数组
    // 另一种声明方法：
    //  int a[3][4] = {0,1,2,3,4,5,6,7,8,9,10,11};
    int array[3][4] = {
        {0, 1, 2, 3} ,
        {4, 5, 6, 7} , 
        {8, 9, 10, 11}
    };
    printf(">>>> array[0][0] is %d\n", array[0][0]);
    return 0;
}
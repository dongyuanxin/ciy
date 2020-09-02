// 使用不带缓冲的I/O
// 需要自定义合适的缓冲区大小

#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

// 缓冲区大小：4kb
#define BUFF_SIZE 4096
#define STDIN_FILENO 0
#define STDOUT_FILENO 1

int main(int argc, char *argv[]) {
    int n;
    char buf[BUFF_SIZE];

    // 0: 没数据；>0: 数据长度；<0: 读取失败
    while((n = read(STDIN_FILENO, buf, BUFF_SIZE)) > 0) {
        if (write(STDOUT_FILENO, buf, n) != n) {
            printf("write error");
            exit(1);
        }
    } 
    if (n < 0) {
        printf("read error");
        exit(1);
    }

    exit(0);
}
#include <stdio.h>
#include <unistd.h>
#include <fcntl.h>

#define BUFFER_SIZE 4096
// 对应文件权限： -rwxr--r--
// 注意：直接设置成 0777 ，然后运行不会成功。除了用户，用户组和其他用户的 w 权限会被自动过滤掉。
#define COPY_MODE 0744

extern int errno;

int main(int ac, char *av[])
{
    int in_fd, out_fd, write_size;
    char buf[BUFFER_SIZE]; // 缓冲区，用来存取待消费（被拷贝）的数据

    if (ac != 3)
    {
        printf("param error\n");
        return 1;
    }

    if ((in_fd = open(av[1], O_RDONLY)) == -1) // 只读模式打开被复制文件
    {
        perror(av[1]);
        return 1;
    }
    if ((out_fd = creat(av[2], COPY_MODE)) == -1) // 存在则覆盖写入，否则创建空白文件
    {
        perror(av[2]);
        return 1;
    }
    // 从文件系统向缓冲区读取字符。如果读取字符大于0，说明有没复制的字符
    while ((write_size = read(in_fd, buf, BUFFER_SIZE)) > 0)
    {
        // 进行写入，写入的数据和读到的数据大小（write_size）不同，则报错
        if (write(out_fd, buf, write_size) != write_size)
        {
            perror("write error");
            return 1;
        }
    }
    if (write_size < 0)
    {
        perror("Read error");
        return 1;
    }

    if (close(in_fd) == -1 || close(out_fd) == -1)
    {
        perror("Close error");
        return 1;
    }

    return 0;
}
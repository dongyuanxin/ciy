#include <stdio.h>
#include <utmpx.h>
#include <errno.h>
#include <fcntl.h>
#include <unistd.h>
#include <time.h>

void show_info(struct utmpx *);
void showtime(long timeval);

int main()
{
    // 在 Linux 下的读取的方法：
    // struct utmpx current_record;
    // int utmpx_fd;
    // int record_len = sizeof(current_record);
    // if ((utmpx_fd = open(UTMPX_FILE, O_RDONLY)) == -1)
    // {
    //     perror(UTMPX_FILE);
    //     exit(1);
    // }
    // while (read(utmpx_fd, &current_record, record_len) == record_len)
    // {
    //     show_info(&current_record);
    // }
    // close(utmpx_fd);

    // 可以联机查 utmpx.h 文件中的说明，在macos下，使用 getutxent 方法读取。
    // 因为直接从 UTMPX_FILE 读出来，结构有问题
    // 参考：https://www.cnblogs.com/czw52460183/p/10999434.html
    struct utmpx *current_record;
    while (1)
    {
        current_record = getutxent();
        if (current_record == NULL)
        {
            break;
        }
        show_info(current_record);
    }

    return 0;
}

void show_info(struct utmpx *record)
{
    //只显示已登录用户
    if (record->ut_type != USER_PROCESS)
    {
        return;
    }
    //用户名
    printf("1.% -12.12s", record->ut_user);
    printf(" ");
    //终端名
    printf("2.% -12.12s", record->ut_line);
    printf(" ");
    // // 主机名
    // printf("( %s)", record->ut_host);
    //登录时间
    showtime(record->ut_tv.tv_sec);
    printf("\n");
}

//将时间戳转换为可读形式并输出
void showtime(long timeval)
{
    char *p;
    p = ctime(&timeval);
    //从第4个字符开始输出，屏蔽星期几的信息
    printf("3.%12.12s", p + 4);
}
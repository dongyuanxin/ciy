#include <stdio.h>

int main()
{
    FILE *fp = NULL; // 文件描述符
    /**
     * 写入文件
     **/
    fp = fopen("/tmp/test.txt", "w+");
    // fputc 写入单个字符
    // fprintf 把字符串写入到文件中
    fprintf(fp, "This is testing for fprintf...\n");
    // fputs 把字符串 s 写入到 fp 所指向的输出流中。如果写入成功，它会返回一个非负值，如果发生错误，则会返回 EOF
    fputs("This is testing for fputs...\n", fp);
    fclose(fp);

    /**
     * 读取文件
     **/
    char buff[255];

    fp = fopen("/tmp/test.txt", "r"); // 打开文件
    // 读取文件。fscanf：在遇到第一个空格和换行符时，停止读取
    fscanf(fp, "%s", buff);
    printf("1: %s\n", buff);

    // fgetc 按字符读

    // 默认从上面位置继续读取 n - 1 个字符
    // 把读取的字符串复制到缓冲区 buf，并在最后追加一个 null 字符来终止字符串
    fgets(buff, 255, fp);
    printf("2: %s\n", buff);

    fclose(fp);

    /**
     * 二进制读写
     **/
    // fread 、fwrite 通常读写存储块，数组或者结构体
}
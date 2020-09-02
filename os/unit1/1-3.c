// 列出一个目录中所有文件

// #include "apue.h"
#include <stdio.h>
#include <stdlib.h> 
#include <dirent.h>


int main(int argc, char *argv[]) {
    DIR *dp; // 目录指针
    struct dirent *dirp; // 目录项指针

    if (argc != 2) {
        printf("Please input argc");
        exit(1);
    }

    if((dp = opendir(argv[1])) == NULL) {
        printf("can't open %s", argv[1]);
        exit(1);
    }

    while((dirp = readdir(dp))!= NULL) {
        printf("%s\n", dirp->d_name);
    }

    closedir(dp);
    exit(0);
}
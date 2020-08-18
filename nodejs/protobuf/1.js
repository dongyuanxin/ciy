const protobuf = require('protobufjs');

main();

function main() {
    const payload = {
        school: 'szu',
        teacher: {
            name: 'dongyuanxin',
            sex: 2,
            location: {
                country: 'zh-cn',
            },
        },
    };

    protobuf.load('./student.proto').then((root) => {
        const AwesomeMessage = root.lookupType('student.StudentMessage');

        // step1：校验是否合法
        let verified = AwesomeMessage.verify(payload);
        if (verified) {
            // verified 存放不合法信息
            throw new Error(verified);
        }

        // step2: 工厂模式创建编译/解码器
        let message = AwesomeMessage.create(payload);
        console.log(message);

        // step3: 编译为2进制
        let buffer = AwesomeMessage.encode(message).finish();
        console.log(buffer);
        // step4: 解码
        let decoded = AwesomeMessage.decode(buffer);
        console.log(decoded);
    });
}

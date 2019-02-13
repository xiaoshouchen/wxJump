<template>
    <div>
        <div class="email">
            <h2 style="margin: 0 0 8px 0;padding: 0">邮件配置:</h2>
            <table>
                <tr>
                    <td>邮件发送开关:</td>
                    <td>
                        <el-select v-model="email.value.status" placeholder="请选择">
                            <el-option
                                    v-for="item in option"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </td>
                    <td>
                        <span>
                            <i class="el-icon-warning" style="color: red;"></i>
                            默认关闭状态,如需开启请选择开启并设置好通知参数并保存
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>SMTP服务器:</td>
                    <td>
                        <el-input class="longInput" v-model="email.value.smtp_server" placeholder="请输入邮箱服务器地址"></el-input>
                    </td>
                    <td>
                         <span>
                            <i class="el-icon-warning" style="color: red;"></i>
                            网易163邮箱：<el-tag>smtp.163.com</el-tag>，qq邮箱：<el-tag>smtp.qq.com</el-tag>
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>SMTP服务器端口:</td>
                    <td>
                        <el-input class="longInput" v-model="email.value.smtp_port" placeholder="请输入邮箱服务器地址"></el-input>
                    </td>
                    <td>
                         <span>
                            <i class="el-icon-warning" style="color: red;"></i>
                            网易163邮箱：<el-tag>25</el-tag>，qq邮箱：<el-tag>465</el-tag>
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>SMTP账户:</td>
                    <td>
                        <el-input class="longInput" v-model="email.value.smtp_user" placeholder="请输入邮箱账号"></el-input>
                    </td>
                    <td>
                         <span>
                            <i class="el-icon-warning" style="color: red;"></i>
                            输入邮箱的登录账户
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>登录授权码:</td>
                    <td>
                        <el-input class="longInput" v-model="email.value.smtp_password" placeholder="第三方授权密码"></el-input>
                    </td>
                    <td>
                         <span>
                            <i class="el-icon-warning" style="color: red;"></i>
                            填写邮箱的客户端授权密码
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>邮件标题:</td>
                    <td>
                        <el-input class="longInput" v-model="email.value.email_title" placeholder="请输入邮箱服务器地址"></el-input>
                    </td>
                    <td>
                         <span>
                            <i class="el-icon-warning" style="color: red;"></i>
                            通知信息的标题
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>
                        操作:
                    </td>
                    <td>
                        <el-button type="primary" @click="emailSubmit">保存配置</el-button>
                    </td>
                    <td>
                        <el-button type="success" @click="emailTest">测试发送</el-button>
                    </td>
                </tr>
            </table>
        </div>
        <div class="phone">
            <h2 style="margin: 0 0 8px 0;padding: 0">短信配置:</h2>
            <table>
                <tr>
                    <td>短信发送开关:</td>
                    <td>
                        <el-select v-model="phone.value.status" placeholder="请选择">
                            <el-option
                                    v-for="item in option"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </td>
                    <td>
                          <span>
                            <i class="el-icon-warning" style="color: red;"></i>
                            默认关闭状态,如需开启请选择开启并设置好通知参数并保存
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>选择服务商:</td>
                    <td>
                        <el-select v-model="phone.value.provider" placeholder="请选择">
                            <el-option
                                    v-for="item in provider"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </td>
                    <td>
                          <span>
                            <i class="el-icon-warning" style="color: red;"></i>
                            选择服务商类型
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>accessKeyId:</td>
                    <td>
                        <el-input class="longInput" v-model="phone.value.access_key_id" placeholder="请输入授权Id"></el-input>
                    </td>
                    <td>
                          <span>
                            <i class="el-icon-warning" style="color: red;"></i>
                            填写授权Id
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>Secret密匙:</td>
                    <td>
                        <el-input class="longInput" v-model="phone.value.secret" placeholder="填写授权密匙"></el-input>
                    </td>
                    <td>
                          <span>
                            <i class="el-icon-warning" style="color: red;"></i>
                            填写授权密匙
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>短信签名:</td>
                    <td>
                        <el-input class="longInput" v-model="phone.value.sing_anme" placeholder="请输入短信的签名"></el-input>
                    </td>
                    <td>
                          <span>
                            <i class="el-icon-warning" style="color: red;"></i>
                            填写短信签名
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>模板代码:</td>
                    <td>
                        <el-input class="longInput" v-model="phone.value.TemplateCode" placeholder="请输入模板代码"></el-input>
                    </td>
                    <td>
                          <span>
                            <i class="el-icon-warning" style="color: red;"></i>
                            模板代码
                        </span>
                    </td>
                </tr>

                <tr>
                    <td>短信内容:</td>
                    <td>
                        <el-input class="longInput" v-model="phone.value.content" placeholder="请填写短信通知内容"></el-input>
                    </td>
                    <td>
                          <span>
                            <i class="el-icon-warning" style="color: red;"></i>
                            短信的通知内容
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>
                        操作:
                    </td>
                    <td>
                        <el-button type="primary" @click="phoneSubmit">保存配置</el-button>
                    </td>
                    <td>
                        <el-button type="success" @click="phoneTest">测试发送</el-button>
                    </td>
                </tr>
            </table>

        </div>
    </div>
</template>

<script>
    import {config_get, config_add, config_update,emailTest,phoneTest} from '@/api/system'
    export default {
        name: "notify",
        data() {
            return {
                option: [
                    {
                        label: '关闭',
                        value: '0'
                    },
                    {
                        label: '开启',
                        value: '1'
                    }
                ],
                provider: [
                    {
                        label: '短信宝',
                        value: 'smsbao'
                    },
                ],
                email: {
                    value:{
                        status: '0',
                        smtp_server: 'smtp.163.com',
                        smtp_port: '25',
                        smtp_user: '',
                        smtp_password: '',
                        email_title: '测试通知信息'
                    },
                    keyword: 'emailNotify',
                    type: 'json',
                    desc: '邮件消息通知配置',
                    pid: 0
                },
                phone: {
                    keyword: 'phoneNotify',
                    value:{
                        status: '0',
                        provider: 'aldy',
                        access_key_id: '',
                        secret: '',
                        content: '测试通知信息',
                        sing_anme: '',
                        TemplateCode: '',
                    },
                    type: 'json',
                    desc: '手机短信通知配置',
                    pid: 0

                },
                phoneStatus:'add',
                emailStatus:'add'
            }
        },
        created(){
            config_get('emailNotify').then((response)=>{
                if (response.data.status != false) {
                    this.email.value = response.data.data;
                    this.emailStatus = 'update'
                } else {
                    this.$message.info('没有配置过邮件通知信息')
                }
            });
            config_get('phoneNotify').then((response)=>{
                if (response.data.status != false) {
                    this.phone.value = response.data.data;
                    this.phoneStatus = 'update'
                } else {
                    this.$message.info('没有配置过短信通知信息')
                }
            });
        },
        methods:{
            phoneSubmit() {
                if (this.phoneStatus == 'add') {
                    config_add(this.phone).then((response)=>{
                        this.$message.success(response.data.message);
                    })
                }
                if (this.phoneStatus == 'update') {
                    config_update(1, this.phone).then((response) => {
                        this.$message.success(response.data.message);
                    });
                }
            },
            emailSubmit() {
                if (this.emailStatus == 'add') {
                    config_add(this.email).then((response)=>{
                        this.$message.success(response.data.message);
                    })
                }
                if (this.emailStatus == 'update') {
                    config_update(1, this.email).then((response) => {
                        this.$message.success(response.data.message);
                    });
                }
            },
            phoneTest() {
                phoneTest(this.phone.value).then((response)=>{
                    if (response.data.code == -1) {
                        this.$message.error(response.data.msg)
                    }
                    this.$message.success(response.data.msg)
                })
            },
            emailTest() {
                emailTest(this.email.value).then((response)=>{
                    if (response.data.code == -1) {
                        this.$message.error(response.data.msg)
                    }
                    this.$message.success(response.data.msg)
                })
            }
        }
    }
</script>

<style scoped>
    .longInput {
        width: 400px;
    }

    tr {
        line-height: 50px;
    }

    .email {
        background-color: #ffffff;
    }

    .phone {
        margin-top: 15px;
        background-color: #ffffff;
    }
</style>
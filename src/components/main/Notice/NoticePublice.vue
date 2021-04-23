<template>
  <div>
    <el-row :gutter="0">
      <el-col :span="12" tag="标题">
        <div>
          <el-tag type="success">文章标题 </el-tag>
          <el-input
            style="width: 700px; position:relative;"
            type="text"
            placeholder="请输入标题"
            v-model="notice.noticeTitle"
            maxlength="20"
            show-word-limit
            clearable
          >
          </el-input>
        </div>
      </el-col>
      <el-col :span="6">
        <el-tag type="success">文章类型</el-tag>
        <el-select
          :disabled="notice.noticeType != ''"
          v-model="notice.noticeType"
          placeholder="请选择文章类型"
        >
          <el-option label="公告" value="1"></el-option>
          <el-option label="健康知识" value="2"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <br />
    <br />
    <mavon-editor
      ref="md"
      @change="change"
      v-model="notice.noticeContent"
      @save="save"
      @imgAdd="imgAdd"
    ></mavon-editor>
    <el-row>
      <br />
      <el-button type="primary" round @click="save" s>提交</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      notice: {
        noticeContent: '',
        noticeHtml: '',
        noticeTitle: '',
        noticeType: '',
        id: 0
      },
      noticeid: '',
      options: [
        {
          value: '1',
          label: '公告'
        },
        {
          value: '2',
          label: '健康知识'
        }
      ]
    };
  },
  watch: {
    noticeType: function(val, oldVal) {
      console.log('new: %s, old: %s', val, oldVal);
    }
  },
  mounted() {
    if (this.$route.params.id) {
      this.noticeid = this.$route.params.id;
      this.getNotice();
    }
  },
  methods: {
    imgAdd(pos, $file) {
      var that = this;
      // alert('idjfdhf');
      // debugger;
      // 第一步.将图片上传到服务器.
      var formData = new FormData();
      formData.append('image', $file);
      console.log(formData.get('image'));
      this.axios({
        url: 'uploadpicture',
        method: 'post',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then(resp => {
        var url = resp.data;
        console.log(url);
        this.$refs.md.$img2Url(pos, resp.data);
      });
    },
    change(value, render) {
      // render 为 markdown 解析后的结果
      this.notice.noticeHtml = render;
    },
    getNotice() {
      let params = { id: this.noticeid };
      this.axios
        .get('findnoticebyid/' + this.noticeid)
        .then(resp => {
          console.log(resp.data);
          this.notice = resp.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    save() {
      if (this.notice.noticeTitle == '') {
        this.$message({
          message: '请输入标题',
          type: 'warning'
        });
        return;
      }
      this.$confirm('是否提交', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          if (this.noticeid == '') {
            this.axios.post('createnotice', this.notice).then(resp => {
              if (resp.status == 200) {
                this.$message({
                  type: 'success',
                  message: ' 提交成功'
                });
                this.$router.push({
                  name: 'noticelist'
                });
              } else {
                this.$message({
                  type: 'error',
                  message: ' 提交失败' + resp.message
                });
              }
            });
          } else {
            this.notice.id = this.noticeid;
            this.axios.post('updatenotice', this.notice).then(resp => {
              if (resp.status == 200) {
                this.$message({
                  type: 'success',
                  message: ' 提交成功'
                });
                this.$router.push({
                  name: 'noticelist'
                });
              } else {
                this.$message({
                  type: 'error',
                  message: ' 提交失败' + resp.message
                });
              }
            });
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消提交'
          });
        });
    }
  }
};
</script>

<style></style>

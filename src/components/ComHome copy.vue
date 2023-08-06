<template>
  <div class="common-layout">
    <el-container>
      <!-- ————————————————————————————————————————————————————————————————头部 ————————————————————————————————————————————————————————————————————————-->
      <el-header>
        <div class="add">
          <el-button :plain="true" @click="handleAdd">新增数据</el-button>
        </div>
        <div class="title">后台管理系统</div>
        <span id="logout">
          <router-link to="/"
            ><el-button :plain="true" @click="open1"
              >退出</el-button
            ></router-link
          ></span
        >
      </el-header>
      <hr />
      <!-- ——————————————————————————————————————————————————————————————————————主体———————————————————————————————————————————————————————————————————— -->
      <el-main
        ><el-table :data="displayedData" style="width: 100%">
          <el-table-column class="one" label="id" prop="id" />
          <el-table-column label="用户名" prop="name" />
          <el-table-column label="性别" prop="sex" />
          <el-table-column label="年龄" prop="age" />
          <el-table-column label="爱好" prop="hobby" />
          <el-table-column>
            <template #header>
              <el-input
                class="search"
                v-model="search"
                size="small"
                placeholder="Type id or name "
              />
            </template>

            <template #default="scope">
              <!-- 修改按钮 -->
              <!-- scope.$index, scope.row拿到每一行的index和数据 -->
              <el-button
                size="small"
                @click="handleEdit(scope.row, scope.$index)"
                >Edit</el-button
              >
              <!-- 删除按钮 -->
              <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.$index)"
                >Delete</el-button
              >
            </template>
          </el-table-column>
        </el-table></el-main
      ><!-- 删除确认弹窗 -->
      <el-dialog v-model="delDialogVisible" title="Tips" width="30%">
        <span>This is a message</span>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="open4">Cancel</el-button>
            <el-button type="primary" @click="delDialogVisible = false">
              Yes
            </el-button>
          </span>
        </template></el-dialog
      >
      <!-- ————————————————————————————————————————————————————————————————尾部分页—————————————————————————————————————————————————————————— -->
      <el-footer>
        <div class="demo-pagination-block">
          <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[5, 10, 15, 20]"
            :small="small"
            :disabled="disabled"
            :background="background"
            layout="total, sizes, prev, pager, next, jumper"
            :total="filterTableData.length"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-footer>
      <!-- 编辑弹窗 -->
      <el-dialog
        v-model="dialogFormVisible"
        :title="titleMsg"
        width="40%"
        round-button="true"
      >
        <el-form :model="form" label-width="100px" style="padding-right: 30px">
          <el-form-item label="id：">
            <el-input v-model="form.id"></el-input>
          </el-form-item>
          <el-form-item label="姓名：">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="性别：">
            <el-radio-group v-model="form.sex">
              <el-radio label="男">男</el-radio>
              <el-radio label="女">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 限制只能输入数字 -->
          <el-form-item label="年龄：">
            <el-input v-model.number="form.age"></el-input>
          </el-form-item>
          <el-form-item label="爱好：">
            <el-input v-model="form.hobby"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="save">确认</el-button>
          </span>
        </template>
      </el-dialog>
    </el-container>
  </div>
</template>
<script setup>
import { ref, computed, reactive } from "vue";
import Cookies from "js-cookie";
const search = ref("");
const titleMsg = ref("");
const currentPage = ref(1);
const pageSize = ref(5);
const delDialogVisible = ref(false);
//————————————————————————————————————————————————————————————————————————弹窗部分————————————————————————————————————————————————————————————————————————————————
let dialogFormVisible = ref(false);
let form = reactive({});
//全局保存编辑的行号
// 在某些情况下，-1可以表示默认或无效值，也可以作为索引的起始值。这样的设置通常是为了在后续的逻辑中判断globalIndex的有效性
const globalIndex = ref(-1);
const tableData = ref([
  {
    id: "22280419",
    name: "aflavia",
    sex: "女",
    age: "19",
    hobby: "吃饭",
  },
  {
    id: "22280420",
    name: "abflavia",
    sex: "女",
    age: "19",
    hobby: "吃饭",
  },
  {
    id: "22280421",
    name: "abcflavia",
    sex: "女",
    age: "19",
    hobby: "吃饭",
  },
  {
    id: "22280422",
    name: "aaaflavia",
    sex: "女",
    age: "19",
    hobby: "吃饭",
  },
  {
    id: "22280423",
    name: "flaviaaaa",
    sex: "女",
    age: "19",
    hobby: "吃饭",
  },
  {
    id: "22280419",
    name: "aflavia",
    sex: "女",
    age: "19",
    hobby: "吃饭",
  },
  {
    id: "22280420",
    name: "abflavia",
    sex: "女",
    age: "19",
    hobby: "吃饭",
  },
  {
    id: "22280421",
    name: "abcflavia",
    sex: "女",
    age: "19",
    hobby: "吃饭",
  },
  {
    id: "22280422",
    name: "aaaflavia",
    sex: "女",
    age: "19",
    hobby: "吃饭",
  },
  {
    id: "22280423",
    name: "flaviaaaa",
    sex: "女",
    age: "19",
    hobby: "吃饭",
  },
  {
    id: "22280419",
    name: "aflavia",
    sex: "女",
    age: "19",
    hobby: "吃饭",
  },
  {
    id: "22280420",
    name: "abflavia",
    sex: "女",
    age: "19",
    hobby: "吃饭",
  },
  {
    id: "22280421",
    name: "abcflavia",
    sex: "女",
    age: "19",
    hobby: "吃饭",
  },
  {
    id: "22280422",
    name: "aaaflavia",
    sex: "女",
    age: "19",
    hobby: "吃饭",
  },
  {
    id: "22280423",
    name: "flaviaaaa",
    sex: "女",
    age: "19",
    hobby: "吃饭",
  },
]);
//新增数据 设置新的空的绑值对象 打开弹窗
//————————————————————————————————————————————————————————————————————————新增部分————————————————————————————————————————————————————————————————————————————————
const handleAdd = () => {
  form = reactive({});
  // console.log(form.name,form.id)
  //打开弹窗
  titleMsg.value = "新增信息";
  dialogFormVisible.value = true;
};
//————————————————————————————————————————————————————————————————————————校验————————————————————————————————————————————————————————————————————————————————

//保存数据，把数据插入到tableData中，并刷新页面，弹窗关闭
const save = () => {
  // 校验名字只能为英文和中文
  const namePattern = /^[\u4e00-\u9fa5a-zA-Z]+$/;
  if (!namePattern.test(form.name)) {
    alert("名字只能为英文和中文");
    return;
  }

  // 校验年龄为数字
  if (isNaN(form.age)) {
    alert("年龄必须为数字");
    return;
  }

  // 校验性别只能为男或女
  if (form.sex !== "男" && form.sex !== "女") {
    alert("性别只能为男或女");
    return;
  }

  // 校验id为数字
  if (isNaN(form.id)) {
    alert("id必须为数字");
    return;
  }

  //表示编辑
  if (globalIndex.value >= 0) {
    tableData.value[globalIndex.value] = form;
    // console.log(form.name,form.id)

    //还原回去
    globalIndex.value = -1;
  } else {
    //新增
    tableData.value.push(form);
    console.log(form.name, form.id);
  }

  dialogFormVisible.value = false;
};
//————————————————————————————————————————————————————————————————————————编辑部分————————————————————————————————————————————————————————————————————————————————
//编辑
const handleEdit = (row, index) => {
  const newObj = Object.assign({}, row);
  form = reactive(newObj);
  //把当前编辑的行号赋值给全局保存的行号
  globalIndex.value = index;
  console.log(globalIndex.value);
  dialogFormVisible.value = true;
  titleMsg.value = "编辑信息";
};

//————————————————————————————————————————————————————————————————————————删除部分————————————————————————————————————————————————————————————————————————————————
const handleDelete = (index) => {
  ElMessageBox.confirm("Are you sure to delete the data?")
    .then(() => {
      tableData.value.splice(index, 1);
      open2();
    })
    .catch(() => {
      // catch error
      open4();
    });
};
const open4 = () => {
  ElMessage.error("取消删除操作");
};
const open2 = () => {
  ElMessage({
    message: "删除成功",
    type: "success",
  });
};
//————————————————————————————————————————————————————————————————————————查找部分————————————————————————————————————————————————————————————————————————————————
const filterTableData = computed(() =>
  tableData.value.filter(
    (data) =>
      !search.value ||
      data.name.toLowerCase().includes(search.value.toLowerCase()) ||
      data.id.includes(search.value)
  )
);

//————————————————————————————————————————————————————————————————————————分页部分————————————————————————————————————————————————————————————————————————————————
//一共可以分成几页
const pageCount = computed(() =>
  Math.ceil(filterTableData.value.length / pageSize.value)
);
// 处理每页显示条数改变事件
function handleSizeChange(size) {
  pageSize.value = size;
  currentPage.value = 1; // 重置当前页码为第一页
}
// 处理当前页码改变事件
function handleCurrentChange(page) {
  currentPage.value = page;
}
const displayedData = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value;
  const endIndex = startIndex + pageSize.value;
  return filterTableData.value.slice(startIndex, endIndex);
});
//———————————————————————————————————————————————————————————————————————————其他——————————————————————————————————————————————————————————————————————————————————————
//退出弹窗
const open1 = () => {
  ElMessage({
    message: "成功退出",
    duration: 500,
  });
  Cookies.remove("userInfo");
};

const savedInput = Cookies.get("userInfo");
if (savedInput) {
  console.log("从Cookie中读取到的信息为: " + savedInput);
} else {
  console.log("Cookie中未保存输入信息");
}
console.log(JSON.stringify(document.cookie));
</script>
<!-- 样式 -->
<style scoped>
.el-footer,
.el-header {
  /* background-color: rgba(220, 206, 233, 0.432); */
  line-height: 60px;
  margin: 0 auto;
}

.el-main {
  padding-left: 0 120px;
}

.el-header {
  display: flex;
}
.title {
  font-size: 22px;
  font-weight: 600;
  margin: 0 auto;
}

/* .td{
    background-color: rgba(220, 206, 233, 0.432);
} */

hr {
  width: 100%;
}
.search {
  width: 115px;
  height: 24px;
}
#logout {
  display: block;
  position: absolute;
  right: 50px;
}
.add {
  display: block;
  position: absolute;
  left: 50px;
}
.el-table,
.cell {
  padding: 0 30px;
}
.search,
/* .el-input {
  width: 115px;
  font-size: 12px;
} */
.el-dialog {
  border-radius: 150px;
}
.common-layout {
  background-image: url(../assets/bg.png);
  /* background-size:cover; */
  height: 800px;
  background-size: 100% 100%;
}
</style>
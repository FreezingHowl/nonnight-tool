<template>
  <div class="common-layout">
    <el-container>
      <el-header>工具铺</el-header>
      <el-main>
        <div class="container-main-box">
          <div class="main-card-box" v-for="card in cardList" :key="card.id">
            <el-card>
              <template #header>
                <div class="card-header">
                  <span>{{ card.title }}</span>
                </div>
              </template>
              <div class="card-container">
                {{ card.description }}
              </div>
            </el-card>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>

export default {
  data: function () {
    return {
      cardList: [] // 功能卡片列表
    }
  },
  mounted() {
    // 初始化功能卡片列表
    this.cardList = [
      {
        id: "111",
        title: "111",
        description: "111",
        url: ""
      },
      {
        id: "222",
        title: "222",
        description: "222",
        url: ""
      },
      {
        id: "333",
        title: "333",
        description: "333",
        url: ""
      },
      {
        id: "444",
        title: "444",
        description: "444",
        url: ""
      }
    ]
  },
  methods: {

  },
};
</script>

<style scoped>
.container-main-box {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 20px 20px;
}
</style>

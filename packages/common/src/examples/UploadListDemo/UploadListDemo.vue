<script setup lang="ts">
import UploadList from "@/components/UploadList/UploadList.vue"
import {ref} from "vue"
import { postOfAxios } from '@/utils';

const params = ref({
  mode: "upload",
  url: "/api/suap/v1/v0/patrolrecordfileex/upload",
  fileType: "image",
  requestParams: {
    recordid: "996",
    filetype: "image"
  },
  viewUrl: "/api/suap/v1/v0/patrolrecordfileex/view/",
  deleteUrl: "/api/suap/v1/v0/patrolrecordfileex/delete/"
})
const getFileList = async () => {
  const url = "/api/suap/v1/v0/patrolrecordfileex/query"
  const sendData = {
    "page": 1,
    "size": 9999,
    "simple": {
      "oper": "and",
      "calc": "=",
      "query": {
        "record_id": 996
      }
    }
  }
  const res = await postOfAxios(url, sendData)
  if (res && res.data && res.data.rows) {
    const data = res.data.rows
    const returnData = []
    for (let i = 0; i < data.length; i++) {
      returnData.push({
        uid: data[i].file_id,
        name: data[i].file_name,
        status: "done",
        url: "/api/suap/v1/v0/patrolrecordfileex/view/" + data[i].file_id
      })
    }

    return returnData
  } else {
    return []
  }
}

</script>

<template>
  <div class="test">
    <upload-list
      :params="params"
      :getFileList="getFileList"
    ></upload-list>
  </div>
</template>

<style scoped lang="less">
.test{
  width: 100%;
  height: 100%;
}
</style>

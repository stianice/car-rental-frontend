<template>
  <div class="navbar">
    <div class="left-side"></div>
    <div class="right-side">
      <li>
        <a-tooltip content="搜索">
          <a-button class="nav-btn" type="outline" :shape="'circle'">
            <template #icon>
              <icon-search />
            </template>
          </a-button>
        </a-tooltip>
      </li>
      <li>
        <a-tooltip content="切换为中文">
          <a-button class="nav-btn" type="outline" :shape="'circle'">
            <template #icon>
              <icon-language />
            </template>
          </a-button>
        </a-tooltip>
      </li>
      <li>
        <a-tooltip content="消息">
          <a-button class="nav-btn" type="outline" :shape="'circle'">
            <template #icon>
              <icon-message />
            </template>
          </a-button>
        </a-tooltip>
      </li>

      <li>
        <a-tooltip content="切换黑夜模式">
          <a-button class="nav-btn" type="outline" :shape="'circle'">
            <template #icon>
              <icon-moon-fill />
            </template>
          </a-button>
        </a-tooltip>
      </li>
      <li>
        <a-tooltip content="设置">
          <a-button class="nav-btn" type="outline" :shape="'circle'">
            <template #icon>
              <icon-settings />
            </template>
          </a-button>
        </a-tooltip>
      </li>
      <li>
        <span class="mr-2 d-none d-lg-inline text-gray-600 small">管理员</span>
      </li>
      <li>
        <a-avatar :size="32" :style="{ marginRight: '8px' }">
          <img alt="avatar" src="@/assets/img/undraw_profile.svg" />
        </a-avatar>
      </li>
      
    </div>
  </div>
</template>
<style scoped lang="less">
.navbar {
  display: flex;
  justify-content: space-between;
  height: 100%;
  background-color: var(--color-bg-2);
  border-bottom: 1px solid var(--color-border);
  width: calc(100% - 250px);
}

.left-side {
  display: flex;
  align-items: center;
  padding-left: 20px;
}

.right-side {
  display: flex;
  padding-right: 20px;
  list-style: none;

  :deep(.locale-select) {
    border-radius: 20px;
  }

  li {
    display: flex;
    align-items: center;
    padding: 0 10px;
  }

  a {
    color: var(--color-text-1);
    text-decoration: none;
  }

  .nav-btn {
    border-color: rgb(var(--gray-2));
    color: rgb(var(--gray-8));
    font-size: 16px;
  }

  .trigger-btn,
  .ref-btn {
    position: absolute;
    bottom: 14px;
  }

  .trigger-btn {
    margin-left: 14px;
  }
}


.message-popover {
  .arco-popover-content {
    margin-top: 0;
  }
}

.arco-dropdown-list-wrapper {
  max-height: 100vh !important;
}

</style>
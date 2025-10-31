<template>
  <nut-dialog :style="cardStyle" v-model:visible="visibleRef" :title="titleRef" @cancel="handleCancel" @ok="handleOk">
    <view>
      <component :is="content" v-if="visibleRef" :extra="extra" :data="dataRef"></component>
    </view>
  </nut-dialog>
</template>
<script lang="ts">
import { EmitMsg, OffEventHandler, OnEventHandler } from 'src/events';
import WidgetsEvent from 'src/events/modules/WidgetsEvent';
import type { IExtraProperty } from 'xframelib-taro';
import { computed, defineComponent, onMounted, onUnmounted,PropType, ref, watch } from 'vue';
import { Global } from 'xframelib-taro';

export default defineComponent({
  name: 'ModalContainer',
  props: {
    width:{
      type:Number,
      default:400,
    },
    visible:{
      type:Boolean,
      default:false
    },
    content: [String, Number, Boolean, Array, Object]  as PropType<string | number| boolean | any[] |any>,
    //支持数据为多类型
    data: [String, Number, Boolean, Array, Object]  as PropType<string | number| boolean | any[] |any>,
    extra: Object as PropType<IExtraProperty>
  },
  setup(props) {
    const visibleRef = ref<boolean>(props.visible);
    const dataRef = ref(props.data);
    watch(
      () => props.visible,
      (newVal) => {
        visibleRef.value = newVal;
        if (props.visible)
          //必须的
          dataRef.value = props.data;
      }
    );
    //解决：不可见时仍旧传值
    watch(
      () => props.data,
      () => {
        if (visibleRef.value) {
          dataRef.value = props.data;
        }
      }
    );
    //标题
    const titleRef = computed(() => {
      if (props.extra?.title) return props.extra?.title;
      else if (props.content) return props.content.title;
      else return '对话框';
    });

    //确定
    const handleOk = (e: MouseEvent) => {
      const formChild = props.content;
      if (formChild) {
        if (formChild.validateForm) {
          formChild
            .validateForm()
            .then((res) => {
              //校验成功
              visibleRef.value = false;
              EmitMsg(formChild.name, true);
            })
            .catch((ex) => {
              Global.Message.err('表单校验失败！');
            });
        } else {
          visibleRef.value = false;
          EmitMsg(formChild.name, true);
        }
      }
    };
    //取消
    const handleCancel = (e: MouseEvent) => {
      visibleRef.value = false;
      if (props.content) EmitMsg(props.content.name, false);
    };

    function closeModal(data) {
      visibleRef.value = false;
    }
    onMounted(() => {
      OnEventHandler(WidgetsEvent.ModalContainerWidget_CloseModal, closeModal);
    });
    onUnmounted(() => {
      OffEventHandler(WidgetsEvent.ModalContainerWidget_CloseModal, closeModal);
    });

    const cardStyle = computed(() => {
      return `width: ${props.width}px; max-width: 80%`;
    });
    return {
      dataRef,
      visibleRef,
      handleOk,
      titleRef,
      handleCancel,
      cardStyle
    };
  }
});
</script>

<template>
  <view class="audio-player">
    <!-- 控制按钮 -->
    <view class="controls">
      <button class="control-btn control-volbtn" @tap="setVolume(volume - 10)">
        <svg-icon-web icon="ic:baseline-volume-down" size="24"></svg-icon-web>
      </button>
      <button class="control-btn" @tap="togglePlay">
        <svg-icon-web v-if="isPlaying" icon="ep:video-pause" size="24"></svg-icon-web>
        <svg-icon-web v-else icon="ep:video-play" size="24"></svg-icon-web>
      </button>
      <button class="control-btn control-volbtn" @tap="setVolume(volume + 10)">
        <svg-icon-web icon="ic:baseline-volume-up" size="24"></svg-icon-web>
      </button>
      <!-- <button class="control-btn" @tap="toggleMute">
        <text>{{ muted ? '🔇' : '🔊' }}</text>
      </button> -->
    </view>
    <!-- 进度显示 -->
    <view class="progress-container">
      <text class="time">{{ formatTime(currentTime) }}</text>
      <view class="progress-bar" @tap="handleProgressTap">
        <view class="progress-played" :style="{ width: progress + '%' }"></view>
        <view class="progress-thumb" :style="{ left: progress + '%' }" @touchstart="isDragging = true"
          @touchmove="handleProgressDrag" @touchend="handleProgressEnd"></view>
      </view>
      <text class="time">{{ formatTime(duration) }}</text>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import Taro from '@tarojs/taro'

const props = defineProps({
  src: {
    type: String,
    required: true
  }
})
// 音频上下文对象
let innerAudioContext = null

// 状态管理
const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const progress = ref(0)
const volume = ref(80)
const muted = ref(false)
const loop = ref(true)
const statusMessage = ref('')
const isDragging = ref(false)

// 格式化时间 (秒 -> mm:ss)
const formatTime = (time) => {
  if (!time || isNaN(time)) return '00:00'
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}


// 初始化音频上下文
const initAudioContext = () => {
  // 创建音频上下文
  innerAudioContext = Taro.createInnerAudioContext()

  // 设置音频源 (可以替换为你的音频地址)
  innerAudioContext.src = props.src;

  // 设置初始音量
  innerAudioContext.volume = volume.value / 100
  innerAudioContext.muted = muted.value
  innerAudioContext.loop = loop.value

  // 监听音频事件
  innerAudioContext.onPlay(() => {
    isPlaying.value = true
    statusMessage.value = '开始播放'
  })

  innerAudioContext.onPause(() => {
    isPlaying.value = false
    statusMessage.value = '已暂停'
  })

  innerAudioContext.onStop(() => {
    isPlaying.value = false
    statusMessage.value = '已停止'
  })

  innerAudioContext.onEnded(() => {
    isPlaying.value = false
    statusMessage.value = '播放结束'
    if (!loop.value) {
      // 如果不循环，重置进度
      currentTime.value = 0
      progress.value = 0
    }
  })

  innerAudioContext.onTimeUpdate(() => {
    // 拖动时不更新进度
    if (isDragging.value) return

    currentTime.value = innerAudioContext.currentTime
    duration.value = innerAudioContext.duration || 0

    // 计算进度百分比
    if (duration.value > 0) {
      progress.value = (currentTime.value / duration.value) * 100
    }
  })

  innerAudioContext.onError((res) => {
    statusMessage.value = `播放错误: ${res.errMsg} (${res.errCode})`
    console.error('音频错误:', res)
  })

  // 加载音频元数据
  innerAudioContext.onCanplay(() => {
    duration.value = innerAudioContext.duration || 0
    statusMessage.value = '可以播放了'
  })
}

// 切换播放/暂停
const togglePlay = () => {
  if (isPlaying.value) {
    innerAudioContext.pause()
  } else {
    innerAudioContext.play()
  }
}

// 调整音量
const setVolume = (newVolume) => {
  // 确保音量在0-100范围内
  if (newVolume < 0) newVolume = 0
  if (newVolume > 100) newVolume = 100

  volume.value = newVolume
  innerAudioContext.volume = newVolume / 100

  // 如果设置了音量，取消静音
  if (newVolume > 0 && muted.value) {
    muted.value = false
    innerAudioContext.muted = false
  }
}

// 切换静音状态
// const toggleMute = () => {
//   muted.value = !muted.value
//   innerAudioContext.muted = muted.value
// }

// 切换循环状态
const toggleLoop = () => {
  loop.value = !loop.value
  innerAudioContext.loop = loop.value
}

// 处理进度条点击
const handleProgressTap = (e) => {
  if (!duration.value) return

  const barWidth = e.currentTarget.offsetWidth
  const tapPosition = e.detail.x
  const newProgress = (tapPosition / barWidth) * 100

  updateAudioProgress(newProgress)
}

// 处理进度拖动
const handleProgressDrag = (e) => {
  if (!duration.value || !isDragging.value) return

  const barWidth = e.currentTarget.parentElement.offsetWidth
  let touchPosition = e.touches[0].clientX

  // 限制在进度条范围内
  if (touchPosition < 0) touchPosition = 0
  if (touchPosition > barWidth) touchPosition = barWidth

  progress.value = (touchPosition / barWidth) * 100
}

// 结束进度拖动
const handleProgressEnd = () => {
  if (!duration.value) return

  isDragging.value = false
  updateAudioProgress(progress.value)

  // 如果之前是暂停状态，拖动后自动播放
  if (!isPlaying.value) {
    togglePlay()
  }
}

// 更新音频进度
const updateAudioProgress = (percent) => {
  const newTime = (percent / 100) * duration.value
  currentTime.value = newTime
  progress.value = percent
  innerAudioContext.seek(newTime)
}

// 监听音量变化
watch(volume, (newVal) => {
  innerAudioContext.volume = newVal / 100
})
watch(props.src, srcVal => {
  if (srcVal && initAudioContext) {
    isPlaying.value = false;
    currentTime.value = 0;
    duration.value = 0;
    progress.value = 0;
    initAudioContext.src = srcVal;
  }
})

// 组件挂载时初始化
onMounted(() => {
  initAudioContext()
  statusMessage.value = '初始化完成，准备播放'
})

// 组件卸载时清理
onUnmounted(() => {
  if (innerAudioContext) {
    innerAudioContext.stop()
    innerAudioContext.offPlay()
    innerAudioContext.offPause()
    innerAudioContext.offStop()
    innerAudioContext.offEnded()
    innerAudioContext.offTimeUpdate()
    innerAudioContext.offError()
    innerAudioContext.offCanplay()
    innerAudioContext.destroy() // 销毁上下文
  }
})
</script>

<style lang="scss">
.audio-player {
  border-radius: 12px;
  width: 100%;

  .rotating {
    animation: rotate 15s linear infinite;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }

  .audio-meta {
    flex: 1;
  }


  .progress-container {
    display: flex;
    align-items: center;
    margin-bottom: 25px;
    width: 100%;
  }

  .time {
    font-size: 18px;
    color: #999;
    width: 50px;
  }

  .progress-bar {
    flex: 1;
    height: 10px;
    background-color: #e0e0e0;
    border-radius: 5px;
    position: relative;
    margin: 0 10px;
  }

  .progress-played {
    height: 100%;
    background-color: #4285f4;
    border-radius: 2px;
  }

  .progress-thumb {
    position: absolute;
    width: 16px;
    height: 16px;
    background-color: #4285f4;
    border-radius: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }

  .controls {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
    margin-bottom: 10px;

    .control-btn {
      border-radius: 60px;
      height: 100px;
      background-color: #F8C56A;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .control-volbtn {
      border-radius: 30px;
      height: 60px;
      padding-left: 8px;
      padding-right: 8px;
    }

    .control-btn:active {
      background-color: #f0f0f0;
    }
  }
}
</style>
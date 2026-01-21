/**
 * 春节联欢晚会倒计时背景音乐控制器
 * 使用bgm1.mp3和bgm2.mp3作为主要背景音乐
 */

class SpringFestivalMusicController {
    constructor() {
        this.bgm1 = new Audio('assets/audio/bgm1.mp3');
        this.bgm2 = new Audio('assets/audio/bgm2.mp3');
        this.bgm3 = new Audio('assets/audio/bgm3.mp3');
        this.bgm4 = new Audio('assets/audio/bgm4.mp3');
        this.bgm5 = new Audio('assets/audio/bgm5.mp3');
        this.currentMusic = null;
        this.isPlaying = false;
        this.fadeInterval = null;
        this.crossfadeInterval = null;

        // 音频设置
        this.bgm1.loop = true;
        this.bgm2.loop = true;
        this.bgm3.loop = true;
        this.bgm4.loop = true;
        this.bgm5.loop = true;
        this.bgm1.volume = 0.4;
        this.bgm2.volume = 0.5;
        this.bgm3.volume = 0.6;
        this.bgm4.volume = 0.7;
        this.bgm5.volume = 0.8;

        this.init();
    }

    init() {
        // 预加载音频文件
        this.bgm1.load();
        this.bgm2.load();
        this.bgm3.load();
        this.bgm4.load();
        this.bgm5.load();

        // 添加事件监听器
        this.bgm1.addEventListener('canplaythrough', () => {
            console.log('BGM1 加载完成');
        });

        this.bgm2.addEventListener('canplaythrough', () => {
            console.log('BGM2 加载完成');
        });

        this.bgm3.addEventListener('canplaythrough', () => {
            console.log('BGM3 加载完成');
        });

        this.bgm4.addEventListener('canplaythrough', () => {
            console.log('BGM4 加载完成');
        });

        this.bgm5.addEventListener('canplaythrough', () => {
            console.log('BGM5 加载完成');
        });

        // 音频结束时重新开始
        this.bgm1.addEventListener('ended', () => {
            if (this.isPlaying && this.currentMusic === this.bgm1) {
                this.bgm1.currentTime = 0;
                this.bgm1.play();
            }
        });

        this.bgm2.addEventListener('ended', () => {
            if (this.isPlaying && this.currentMusic === this.bgm2) {
                this.bgm2.currentTime = 0;
                this.bgm2.play();
            }
        });

        this.bgm3.addEventListener('ended', () => {
            if (this.isPlaying && this.currentMusic === this.bgm3) {
                this.bgm3.currentTime = 0;
                this.bgm3.play();
            }
        });

        this.bgm4.addEventListener('ended', () => {
            if (this.isPlaying && this.currentMusic === this.bgm4) {
                this.bgm4.currentTime = 0;
                this.bgm4.play();
            }
        });

        this.bgm5.addEventListener('ended', () => {
            if (this.isPlaying && this.currentMusic === this.bgm5) {
                this.bgm5.currentTime = 0;
                this.bgm5.play();
            }
        });
    }

    // 开始播放背景音乐
    playMusic(trackId = 1) {
        if (this.currentMusic) {
            this.stopMusic();
        }

        switch (trackId) {
            case 1:
                this.currentMusic = this.bgm1;
                break;
            case 2:
                this.currentMusic = this.bgm2;
                break;
            case 3:
                this.currentMusic = this.bgm3;
                break;
            case 4:
                this.currentMusic = this.bgm4;
                break;
            case 5:
                this.currentMusic = this.bgm5;
                break;
            default:
                this.currentMusic = this.bgm1;
        }

        this.currentMusic.play()
            .then(() => {
                this.isPlaying = true;
                console.log(`开始播放 BGM${trackId}`);
            })
            .catch(error => {
                console.error('音频播放失败:', error);
                this.showUserInteractionPrompt();
            });
    }

    // 停止播放
    stopMusic() {
        // 清除所有定时器
        if (this.fadeInterval) {
            clearInterval(this.fadeInterval);
            this.fadeInterval = null;
        }
        if (this.crossfadeInterval) {
            clearInterval(this.crossfadeInterval);
            this.crossfadeInterval = null;
        }

        // 停止所有音频
        [this.bgm1, this.bgm2, this.bgm3, this.bgm4, this.bgm5].forEach(bgm => {
            bgm.pause();
            bgm.currentTime = 0;
        });

        this.isPlaying = false;
        this.currentMusic = null;
        console.log('停止播放背景音乐');
    }

    // 设置音量 (0.0 - 1.0)
    setVolume(volume, trackId = null) {
        volume = Math.max(0.0, Math.min(1.0, volume));

        if (trackId === 1) {
            this.bgm1.volume = volume;
        } else if (trackId === 2) {
            this.bgm2.volume = volume;
        } else if (trackId === 3) {
            this.bgm3.volume = volume;
        } else if (trackId === 4) {
            this.bgm4.volume = volume;
        } else if (trackId === 5) {
            this.bgm5.volume = volume;
        } else if (trackId === null) {
            this.bgm1.volume = volume;
            this.bgm2.volume = volume;
            this.bgm3.volume = volume;
            this.bgm4.volume = volume;
            this.bgm5.volume = volume;
        }

        console.log(`设置音量: ${Math.round(volume * 100)}%`);
    }

    // 淡入效果
    fadeIn(duration = 2000, targetVolume = 0.5) {
        if (!this.isPlaying) {
            this.setVolume(0);
            this.playMusic();
        }

        const startVolume = this.currentMusic.volume;
        const volumeStep = (targetVolume - startVolume) / (duration / 100);
        let currentStep = 0;

        if (this.fadeInterval) clearInterval(this.fadeInterval);
        this.fadeInterval = setInterval(() => {
            currentStep++;
            const newVolume = startVolume + (volumeStep * currentStep);
            this.setVolume(newVolume);

            if (currentStep >= duration / 100) {
                clearInterval(this.fadeInterval);
                this.fadeInterval = null;
                this.setVolume(targetVolume);
            }
        }, 100);
    }

    // 淡出效果
    fadeOut(duration = 2000) {
        if (!this.isPlaying) return;

        const startVolume = this.currentMusic.volume;
        const volumeStep = startVolume / (duration / 100);
        let currentStep = 0;

        if (this.fadeInterval) clearInterval(this.fadeInterval);
        this.fadeInterval = setInterval(() => {
            currentStep++;
            const newVolume = Math.max(0, startVolume - (volumeStep * currentStep));
            this.setVolume(newVolume);

            if (currentStep >= duration / 100 || newVolume <= 0) {
                clearInterval(this.fadeInterval);
                this.fadeInterval = null;
                this.stopMusic();
            }
        }, 100);
    }

    // 倒计时音乐调度
    startCountdownMusic() {
        // 60-30秒: 播放BGM1，音量40%
        this.fadeIn(3000, 0.4);
        this.playMusic(1);

        // 30秒后切换到BGM2
        setTimeout(() => {
            if (this.isPlaying) {
                this.crossfade(1, 2, 3000, 0.5);
            }
        }, 30000);

        // 最后10秒增加音量
        setTimeout(() => {
            if (this.isPlaying) {
                this.setVolume(0.7, 2);
            }
        }, 50000);

        // 零点时刻达到高潮
        setTimeout(() => {
            if (this.isPlaying) {
                this.setVolume(0.8, 2);
            }
        }, 60000);
    }

    // 交叉淡变效果
    crossfade(fromTrack, toTrack, duration = 3000, targetVolume = 0.5) {
        const fromAudio = fromTrack === 1 ? this.bgm1 : this.bgm2;
        const toAudio = toTrack === 1 ? this.bgm1 : this.bgm2;

        // 开始播放目标音轨
        toAudio.currentTime = 0;
        toAudio.volume = 0;
        toAudio.play();

        const fadeSteps = duration / 100;
        const volumeStep = targetVolume / fadeSteps;
        let currentStep = 0;

        if (this.crossfadeInterval) clearInterval(this.crossfadeInterval);
        this.crossfadeInterval = setInterval(() => {
            currentStep++;

            // 降低原音轨音量
            const fromVolume = Math.max(0, 1 - (currentStep / fadeSteps));
            fromAudio.volume = fromVolume;

            // 增加目标音轨音量
            const toVolume = Math.min(targetVolume, volumeStep * currentStep);
            toAudio.volume = toVolume;

            if (currentStep >= fadeSteps) {
                clearInterval(this.crossfadeInterval);
                this.crossfadeInterval = null;
                fromAudio.pause();
                fromAudio.currentTime = 0;
                toAudio.volume = targetVolume;
                this.currentMusic = toAudio;
                this.isPlaying = true;
            }
        }, 100);
    }

    // 提示用户交互（浏览器自动播放策略）
    showUserInteractionPrompt() {
        const prompt = document.createElement('div');
        prompt.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            z-index: 10000;
        `;
        prompt.innerHTML = `
            <h3>🎵 点击播放背景音乐</h3>
            <p>浏览器需要用户交互才能播放音频</p>
            <button onclick="this.parentElement.remove(); musicController.playMusic(1)" 
                    style="background: #d63384; color: white; border: none; 
                           padding: 10px 20px; border-radius: 5px; cursor: pointer;">
                🎊 播放音乐
            </button>
        `;
        document.body.appendChild(prompt);

        // 5秒后自动消失
        setTimeout(() => {
            if (prompt.parentElement) {
                prompt.remove();
            }
        }, 5000);
    }

    // 获取当前状态
    getStatus() {
        return {
            isPlaying: this.isPlaying,
            currentTrack: this.currentMusic === this.bgm1 ? 'bgm1' :
                this.currentMusic === this.bgm2 ? 'bgm2' : null,
            bgm1Volume: this.bgm1.volume,
            bgm2Volume: this.bgm2.volume,
            bgm1Loaded: this.bgm1.readyState >= 3,
            bgm2Loaded: this.bgm2.readyState >= 3
        };
    }
}

// 全局音乐控制器实例
let musicController;

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    musicController = new SpringFestivalMusicController();

    // 添加键盘控制
    document.addEventListener('keydown', (event) => {
        switch (event.key) {
            case '1':
                musicController.playMusic(1);
                break;
            case '2':
                musicController.playMusic(2);
                break;
            case '3':
                musicController.playMusic(3);
                break;
            case '4':
                musicController.playMusic(4);
                break;
            case '5':
                musicController.playMusic(5);
                break;
            case ' ':
                if (musicController.isPlaying) {
                    musicController.stopMusic();
                } else {
                    musicController.playMusic(1);
                }
                event.preventDefault();
                break;
            case 'ArrowUp':
                musicController.setVolume(Math.min(1, musicController.getStatus().bgm1Volume + 0.1));
                break;
            case 'ArrowDown':
                musicController.setVolume(Math.max(0, musicController.getStatus().bgm1Volume - 0.1));
                break;
        }
    });

    console.log('🎊 春节背景音乐控制器已加载');
    console.log('键盘控制: 1-BGM1, 2-BGM2, 空格-播放/停止, ↑↓-调节音量');
});
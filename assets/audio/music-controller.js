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

        // 音频设置 - 统一使用80%音量
        this.bgm1.loop = true;
        this.bgm2.loop = true;
        this.bgm3.loop = true;
        this.bgm4.loop = true;
        this.bgm5.loop = true;
        this.bgm1.volume = 0.8;
        this.bgm2.volume = 0.8;
        this.bgm3.volume = 1.0;
        this.bgm4.volume = 0.8;
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
        // 停止所有音频
        [this.bgm1, this.bgm2, this.bgm3, this.bgm4, this.bgm5].forEach(bgm => {
            bgm.pause();
            bgm.currentTime = 0;
        });

        this.isPlaying = false;
        this.currentMusic = null;
        console.log('停止播放背景音乐');
    }



    // 倒计时音乐调度
    startCountdownMusic() {
        // 直接播放BGM1，不再自动切换
        this.playMusic(1);
    }



    // 提示用户交互（浏览器自动播放策略）
    showUserInteractionPrompt() {
        const prompt = document.createElement('div');
        prompt.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 30px;
            border-radius: 15px;
            text-align: center;
            z-index: 10000;
            max-width: 600px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        `;
        prompt.innerHTML = `
            <h2>🎊 2026维多利亚春节联欢晚会 - 操作指南</h2>
            
            <div style="margin: 20px 0; text-align: left;">
                <h4 style="color: #ffd700; margin-bottom: 10px;">🎵 音乐控制</h4>
                <p>• 数字键 1-5: 播放不同的背景音乐</p>
                <p>• 空格键: 播放/停止当前音乐</p>
            </div>
            
            <div style="margin: 20px 0; text-align: left;">
                <h4 style="color: #ffd700; margin: 15px 0 10px;">🏢 赞助商信息</h4>
                <p>• 点击主办方/赞助商名称查看详细信息</p>
                <p>• S键: 开始/停止自动循环展示赞助商</p>
                <p>• ESC键: 关闭当前弹窗</p>
            </div>
            
            <div style="margin: 20px 0; text-align: left;">
                <h4 style="color: #ffd700; margin: 15px 0 10px;">🖥️ 显示控制</h4>
                <p>• 双击页面空白处进入/退出全屏模式</p>
            </div>
        `;
        document.body.appendChild(prompt);

        // 15秒后自动消失
        setTimeout(() => {
            if (prompt.parentElement) {
                prompt.remove();
            }
        }, 15000);
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
                }
                event.preventDefault();
                break;

        }
    });

    console.log('🎊 2026维多利亚春节联欢晚会倒计时系统已加载');
    console.log('操作指南:');
    console.log('  音乐控制: 1-5键-播放音乐, 空格-停止播放');
    console.log('  赞助商: 点击查看详情, S键-自动展示, ESC-关闭弹窗');
    console.log('  显示: 双击空白处-全屏模式');
});

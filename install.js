module.exports = {
  run: [
    {
      when: "{{!exists('app')}}",
      method: "shell.run",
      params: {
        message: [
          "git clone https://github.com/caizexin/GenVC app",
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        venv: "app/env",
        message: [
          "python -m pip install pip==20.3.4",
          "pip install transformers==4.33.0",
          "pip install fairseq"
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        venv: "app/env",
        message: [
          "python -m pip install --upgrade pip",
          "pip install torch==2.3.0 torchaudio==2.3.0 --index-url https://download.pytorch.org/whl/cu121",
          "pip install gradio",
          "pip install -r app/requirements.txt",
          "pip install coqpit pandas --upgrade"
        ]
      }
    },
    {
      method: "fs.download",
      params: {
        url: "https://huggingface.co/ZexinCai/GenVC/resolve/main/pre_trained/GenVC_small.pth",
        dir: "app/pre_trained"
      }
    },
    {
      method: "fs.download",
      params: {
        url: "https://huggingface.co/ZexinCai/GenVC/resolve/main/pre_trained/GenVC_large.pth",
        dir: "app/pre_trained"
      }
    },
    {
      method: "fs.download",
      params: {
        url: "https://huggingface.co/ZexinCai/GenVC/resolve/main/pre_trained/contentVec.pt",
        dir: "app/pre_trained"
      }
    },
    {
      method: "fs.download",
      params: {
        url: "https://huggingface.co/ZexinCai/GenVC/resolve/main/pre_trained/acoustic_dvae.pth",
        dir: "app/pre_trained"
      }
    },
    {
      method: "fs.download",
      params: {
        url: "https://huggingface.co/ZexinCai/GenVC/resolve/main/pre_trained/content_dvae.pth",
        dir: "app/pre_trained"
      }
    },
    {
      method: "fs.download",
      params: {
        url: "https://huggingface.co/ZexinCai/GenVC/resolve/main/pre_trained/gpt.pth",
        dir: "app/pre_trained"
      }
    },
    {
      method: "fs.download",
      params: {
        url: "https://huggingface.co/ZexinCai/GenVC/resolve/main/pre_trained/hifigan.pth",
        dir: "app/pre_trained"
      }
    },
    {
      method: "fs.download",
      params: {
        url: "https://huggingface.co/ZexinCai/GenVC/resolve/main/pre_trained/mel_stats.pth",
        dir: "app/pre_trained"
      }
    },
    {
      method: "notify",
      params: {
        html: "Installation completed. Click 'Start' to launch."
      }
    }
  ]
}

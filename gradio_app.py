import gradio as gr
import subprocess
import os
import sys

def genvc_infer(model_choice, src_wav, ref_wav, streaming):
    # Set CWD to app directory so infer.py can find internal files properly
    cwd = os.path.join(os.path.dirname(os.path.abspath(__file__)), "app")
    output_path = os.path.join(cwd, "output.wav")
    if os.path.exists(output_path):
        os.remove(output_path)
    
    model_path = f"pre_trained/{model_choice}.pth"
    
    cmd = [
        sys.executable, "infer.py",
        "--model_path", model_path,
        "--src_wav", src_wav,
        "--ref_audio", ref_wav,
        "--output_path", output_path
    ]
    if streaming:
        cmd.append("--streaming")
        cmd.append("--top_k")
        cmd.append("1")
        
    try:
        subprocess.run(cmd, cwd=cwd, check=True, capture_output=True, text=True)
        return output_path
    except subprocess.CalledProcessError as e:
        print(f"Error:\n{e.stderr}")
        raise gr.Error(f"Inference failed:\n{e.stderr}")

with gr.Blocks(title="GenVC Web UI") as app:
    gr.Markdown("# GenVC Voice Conversion")
    gr.Markdown("Self-Supervised LM-Based Zero-Shot Voice Conversion")
    
    with gr.Row():
        model_choice = gr.Dropdown(choices=["GenVC_small", "GenVC_large"], value="GenVC_small", label="Model")
        streaming = gr.Checkbox(label="Streaming Inference")
    with gr.Row():
        src_wav = gr.Audio(type="filepath", label="Source Audio")
        ref_wav = gr.Audio(type="filepath", label="Reference Audio")
    generate_btn = gr.Button("Generate", variant="primary")
    output_audio = gr.Audio(label="Output Audio")
    
    generate_btn.click(
        fn=genvc_infer,
        inputs=[model_choice, src_wav, ref_wav, streaming],
        outputs=output_audio
    )

if __name__ == "__main__":
    port = int(os.environ.get("GRADIO_SERVER_PORT", 7860))
    app.launch(server_name="127.0.0.1", server_port=port)

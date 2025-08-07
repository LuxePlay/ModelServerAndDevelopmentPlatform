import{r as D,j as e,b as T,S as A,B as o}from"./index-wtGTxSMT.js";import{a as l,T as z,R as j,C as p}from"./row-UWMG3hts.js";import{T as E}from"./index-BPwaGy5a.js";import{D as d}from"./index-CDBRmHIw.js";import{R as c}from"./CheckCircleOutlined-BvipOwjS.js";import{R as a}from"./CopyOutlined-BR-goS_i.js";import{C as y}from"./Collapse-DNzrkjvJ.js";import{D as i}from"./index-gbjdVC6n.js";import{s as K}from"./index-VDe2hEyF.js";import"./CopyOutlined-DO-5wM49.js";import"./pickAttrs-aV3CZMNf.js";import"./CheckCircleFilled-Dtgsd_D3.js";const{Title:n,Paragraph:x,Text:t,Link:v}=E,{TabPane:h}=z,{Panel:m}=y,Q=()=>{const[s,g]=D.useState(null),r=(P,F)=>{navigator.clipboard.writeText(P),g(F),K.success("已复制到剪贴板"),setTimeout(()=>g(null),2e3)},u="pip install bigmodel-sdk",f=`from bigmodel_sdk import BigModelClient

# 使用API密钥初始化客户端
client = BigModelClient(
    api_key="YOUR_API_KEY",
    base_url="https://api.example.com"
)`,b=`# 简单对话
response = client.chat.completions.create(
    model="qwen-7b",
    messages=[
        {"role": "user", "content": "你好，介绍一下人工智能"}
    ],
    temperature=0.7,
    max_tokens=1024
)

print(response.choices[0].message.content)`,C=`# 流式输出
response = client.chat.completions.create(
    model="qwen-7b",
    messages=[
        {"role": "user", "content": "写一篇关于人工智能未来的文章"}
    ],
    stream=True
)

for chunk in response:
    if chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="", flush=True)`,k=`# 文本嵌入
response = client.embeddings.create(
    model="text-embedding-ada-002",
    input="人工智能是计算机科学的一个分支"
)

embedding = response.data[0].embedding
print(f"嵌入向量维度: {len(embedding)}")`,_=`# 获取模型列表
models = client.models.list()

for model in models.data:
    print(f"模型ID: {model.id}, 创建时间: {model.created}")`,w=`# 上传文件
with open("training_data.jsonl", "rb") as file:
    uploaded_file = client.files.create(
        file=file,
        purpose="fine-tune"
    )

print(f"文件ID: {uploaded_file.id}")`,I=`# 创建微调任务
fine_tune = client.fine_tuning.jobs.create(
    training_file="file-abc123",
    model="qwen-7b"
)

print(f"微调任务ID: {fine_tune.id}")
print(f"状态: {fine_tune.status}")`,B=`import asyncio
from bigmodel_sdk import AsyncBigModelClient

async def async_chat():
    client = AsyncBigModelClient(api_key="YOUR_API_KEY")
    
    response = await client.chat.completions.create(
        model="qwen-7b",
        messages=[
            {"role": "user", "content": "Python的异步编程有什么优势？"}
        ]
    )
    
    return response.choices[0].message.content

# 运行异步函数
result = asyncio.run(async_chat())
print(result)`,S=`from bigmodel_sdk import BigModelError

try:
    response = client.chat.completions.create(
        model="non-existent-model",
        messages=[{"role": "user", "content": "Hello"}]
    )
except BigModelError as e:
    print(f"API错误: {e.status_code} - {e.message}")
except Exception as e:
    print(f"其他错误: {str(e)}")`;return e.jsx("div",{style:{padding:"24px"},children:e.jsxs(l,{children:[e.jsxs(n,{level:2,children:[e.jsx(T,{})," Python SDK 使用指南"]}),e.jsx(x,{children:"本文档介绍了如何使用 Python SDK 调用大模型服务与应用开发平台提供的各项功能。"}),e.jsx(d,{}),e.jsxs(A,{direction:"vertical",style:{width:"100%"},children:[e.jsx(n,{level:3,children:"安装 SDK"}),e.jsx(x,{children:"首先，使用 pip 安装我们的 Python SDK："}),e.jsxs(l,{size:"small",children:[e.jsx(x,{style:{fontFamily:"monospace"},children:u}),e.jsx(o,{type:"primary",icon:s==="install-command"?e.jsx(c,{}):e.jsx(a,{}),onClick:()=>r(u,"install-command"),size:"small",children:s==="install-command"?"已复制":"复制"})]}),e.jsx(n,{level:3,children:"SDK 初始化"}),e.jsx(x,{children:"在使用 SDK 之前，需要先初始化客户端："}),e.jsxs(l,{size:"small",children:[e.jsx("pre",{style:{fontFamily:"monospace",whiteSpace:"pre-wrap",marginBottom:"10px"},children:f}),e.jsx(o,{type:"primary",icon:s==="sdk-init"?e.jsx(c,{}):e.jsx(a,{}),onClick:()=>r(f,"sdk-init"),children:s==="sdk-init"?"已复制":"复制代码"})]}),e.jsx(d,{}),e.jsx(n,{level:3,children:"核心功能示例"}),e.jsxs(z,{defaultActiveKey:"1",children:[e.jsx(h,{tab:"Chat Completions",children:e.jsxs(l,{size:"small",children:[e.jsx(n,{level:5,children:"基本用法"}),e.jsx("pre",{style:{fontFamily:"monospace",whiteSpace:"pre-wrap",marginBottom:"10px"},children:b}),e.jsx(o,{type:"primary",icon:s==="chat-completion"?e.jsx(c,{}):e.jsx(a,{}),onClick:()=>r(b,"chat-completion"),style:{marginBottom:"16px"},children:s==="chat-completion"?"已复制":"复制代码"}),e.jsx(n,{level:5,children:"流式输出"}),e.jsx("pre",{style:{fontFamily:"monospace",whiteSpace:"pre-wrap",marginBottom:"10px"},children:C}),e.jsx(o,{type:"primary",icon:s==="stream-example"?e.jsx(c,{}):e.jsx(a,{}),onClick:()=>r(C,"stream-example"),children:s==="stream-example"?"已复制":"复制代码"})]})},"1"),e.jsx(h,{tab:"Embeddings",children:e.jsxs(l,{size:"small",children:[e.jsx("pre",{style:{fontFamily:"monospace",whiteSpace:"pre-wrap",marginBottom:"10px"},children:k}),e.jsx(o,{type:"primary",icon:s==="embedding"?e.jsx(c,{}):e.jsx(a,{}),onClick:()=>r(k,"embedding"),children:s==="embedding"?"已复制":"复制代码"})]})},"2"),e.jsx(h,{tab:"Models",children:e.jsxs(l,{size:"small",children:[e.jsx("pre",{style:{fontFamily:"monospace",whiteSpace:"pre-wrap",marginBottom:"10px"},children:_}),e.jsx(o,{type:"primary",icon:s==="model-list"?e.jsx(c,{}):e.jsx(a,{}),onClick:()=>r(_,"model-list"),children:s==="model-list"?"已复制":"复制代码"})]})},"3"),e.jsx(h,{tab:"Files & Fine-tuning",children:e.jsxs(l,{size:"small",style:{marginBottom:"16px"},children:[e.jsx(n,{level:5,children:"文件上传"}),e.jsx("pre",{style:{fontFamily:"monospace",whiteSpace:"pre-wrap",marginBottom:"10px"},children:w}),e.jsx(o,{type:"primary",icon:s==="file-upload"?e.jsx(c,{}):e.jsx(a,{}),onClick:()=>r(w,"file-upload"),style:{marginBottom:"16px"},children:s==="file-upload"?"已复制":"复制代码"}),e.jsx(n,{level:5,children:"微调任务"}),e.jsx("pre",{style:{fontFamily:"monospace",whiteSpace:"pre-wrap",marginBottom:"10px"},children:I}),e.jsx(o,{type:"primary",icon:s==="fine-tune"?e.jsx(c,{}):e.jsx(a,{}),onClick:()=>r(I,"fine-tune"),children:s==="fine-tune"?"已复制":"复制代码"})]})},"4")]}),e.jsx(d,{}),e.jsx(n,{level:3,children:"高级用法"}),e.jsxs(y,{children:[e.jsx(m,{header:"异步调用",children:e.jsxs(l,{size:"small",children:[e.jsx("pre",{style:{fontFamily:"monospace",whiteSpace:"pre-wrap",marginBottom:"10px"},children:B}),e.jsx(o,{type:"primary",icon:s==="async-example"?e.jsx(c,{}):e.jsx(a,{}),onClick:()=>r(B,"async-example"),children:s==="async-example"?"已复制":"复制代码"})]})},"1"),e.jsx(m,{header:"错误处理",children:e.jsxs(l,{size:"small",children:[e.jsx("pre",{style:{fontFamily:"monospace",whiteSpace:"pre-wrap",marginBottom:"10px"},children:S}),e.jsx(o,{type:"primary",icon:s==="error-handling"?e.jsx(c,{}):e.jsx(a,{}),onClick:()=>r(S,"error-handling"),children:s==="error-handling"?"已复制":"复制代码"})]})},"2"),e.jsx(m,{header:"配置选项",children:e.jsxs(l,{size:"small",children:[e.jsx(n,{level:5,children:"自定义配置"}),e.jsx("pre",{style:{fontFamily:"monospace",whiteSpace:"pre-wrap",marginBottom:"10px"},children:`# 自定义超时和重试配置
client = BigModelClient(
    api_key="YOUR_API_KEY",
    timeout=30,  # 请求超时时间（秒）
    max_retries=3  # 最大重试次数
)`}),e.jsx(n,{level:5,children:"代理设置"}),e.jsx("pre",{style:{fontFamily:"monospace",whiteSpace:"pre-wrap",marginBottom:"10px"},children:`# 使用代理
client = BigModelClient(
    api_key="YOUR_API_KEY",
    http_client=httpx.Client(
        proxies={
            "http://": "http://proxy.example.com",
            "https://": "https://proxy.example.com"
        }
    )
)`})]})},"3")]}),e.jsx(d,{}),e.jsx(n,{level:3,children:"API 参考"}),e.jsxs(j,{gutter:16,children:[e.jsx(p,{span:12,children:e.jsx(l,{size:"small",title:"Chat",children:e.jsx(i,{column:1,size:"small",children:e.jsx(i.Item,{label:"completions.create",children:"创建聊天完成请求"})})})}),e.jsx(p,{span:12,children:e.jsx(l,{size:"small",title:"Embeddings",children:e.jsx(i,{column:1,size:"small",children:e.jsx(i.Item,{label:"create",children:"创建文本嵌入"})})})})]}),e.jsxs(j,{gutter:16,style:{marginTop:"16px"},children:[e.jsx(p,{span:12,children:e.jsx(l,{size:"small",title:"Models",children:e.jsxs(i,{column:1,size:"small",children:[e.jsx(i.Item,{label:"list",children:"列出所有模型"}),e.jsx(i.Item,{label:"retrieve",children:"获取模型详细信息"})]})})}),e.jsx(p,{span:12,children:e.jsx(l,{size:"small",title:"Files",children:e.jsxs(i,{column:1,size:"small",children:[e.jsx(i.Item,{label:"create",children:"上传文件"}),e.jsx(i.Item,{label:"list",children:"列出文件"}),e.jsx(i.Item,{label:"delete",children:"删除文件"})]})})})]}),e.jsx(j,{gutter:16,style:{marginTop:"16px"},children:e.jsx(p,{span:12,children:e.jsx(l,{size:"small",title:"Fine-tuning",children:e.jsxs(i,{column:1,size:"small",children:[e.jsx(i.Item,{label:"jobs.create",children:"创建微调任务"}),e.jsx(i.Item,{label:"jobs.list",children:"列出微调任务"}),e.jsx(i.Item,{label:"jobs.retrieve",children:"获取微调任务详情"})]})})})}),e.jsx(d,{}),e.jsx(n,{level:3,children:"最佳实践"}),e.jsxs(y,{children:[e.jsx(m,{header:"性能优化建议",children:e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx(t,{strong:!0,children:"连接复用："}),"在应用程序中复用客户端实例，避免重复创建连接"]}),e.jsxs("li",{children:[e.jsx(t,{strong:!0,children:"合理设置超时："}),"根据实际需求设置合适的超时时间，避免长时间等待"]}),e.jsxs("li",{children:[e.jsx(t,{strong:!0,children:"批量处理："}),"对于大量数据处理任务，考虑使用批量处理方式"]}),e.jsxs("li",{children:[e.jsx(t,{strong:!0,children:"错误重试："}),"实现合理的重试机制，处理临时性错误"]})]})},"1"),e.jsx(m,{header:"安全建议",children:e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx(t,{strong:!0,children:"密钥管理："}),"不要将 API 密钥硬编码在代码中，使用环境变量或配置文件"]}),e.jsxs("li",{children:[e.jsx(t,{strong:!0,children:"访问控制："}),"为不同的应用创建不同的 API 密钥，并设置适当的权限"]}),e.jsxs("li",{children:[e.jsx(t,{strong:!0,children:"日志记录："}),"避免在日志中记录敏感信息，如 API 密钥"]})]})},"2"),e.jsx(m,{header:"资源管理",children:e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx(t,{strong:!0,children:"及时清理："}),"删除不再需要的文件和微调模型，释放资源"]}),e.jsxs("li",{children:[e.jsx(t,{strong:!0,children:"监控使用："}),"定期检查 API 使用情况，避免超出配额"]})]})},"3")]}),e.jsx(d,{}),e.jsx(n,{level:3,children:"获取帮助"}),e.jsx(x,{children:"如果在使用 SDK 过程中遇到问题，可以通过以下方式获取帮助："}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx(t,{strong:!0,children:"官方文档："}),e.jsx(v,{href:"https://docs.example.com/sdk/python",target:"_blank",children:"https://docs.example.com/sdk/python"})]}),e.jsxs("li",{children:[e.jsx(t,{strong:!0,children:"GitHub 仓库："}),e.jsx(v,{href:"https://github.com/example/bigmodel-sdk-python",target:"_blank",children:"https://github.com/example/bigmodel-sdk-python"})]}),e.jsxs("li",{children:[e.jsx(t,{strong:!0,children:"技术支持："}),"联系我们的技术支持团队 support@example.com"]})]})]})]})})};export{Q as default};

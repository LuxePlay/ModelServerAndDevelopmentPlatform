import{r as b,I as H,u as Y,j as e,b as G,B as d,S as z}from"./index-wtGTxSMT.js";import{a,T as O,R as Q,C as E}from"./row-UWMG3hts.js";import{T as V}from"./index-BPwaGy5a.js";import{A as W}from"./index-betNCfN3.js";import{D as p}from"./index-CDBRmHIw.js";import{R as x}from"./CheckCircleOutlined-BvipOwjS.js";import{R as h}from"./CopyOutlined-BR-goS_i.js";import{C as f}from"./Collapse-DNzrkjvJ.js";import{F as K}from"./Table-CzOluTw_.js";import{D as m}from"./index-gbjdVC6n.js";import{s as X}from"./index-VDe2hEyF.js";import"./CopyOutlined-DO-5wM49.js";import"./CheckCircleFilled-Dtgsd_D3.js";import"./pickAttrs-aV3CZMNf.js";import"./index-Pws8JbMs.js";import"./useForm-BIYdoLOq.js";import"./Input-C9rl66ME.js";var Z={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-.7 5.2-2L869 536.2a32.07 32.07 0 000-48.4z"}}]},name:"arrow-right",theme:"outlined"};function g(){return g=Object.assign?Object.assign.bind():function(i){for(var c=1;c<arguments.length;c++){var y=arguments[c];for(var l in y)Object.prototype.hasOwnProperty.call(y,l)&&(i[l]=y[l])}return i},g.apply(this,arguments)}const ee=(i,c)=>b.createElement(H,g({},i,{ref:c,icon:Z})),ne=b.forwardRef(ee),{Title:r,Paragraph:o,Text:s,Link:N}=V,{TabPane:U}=O,{Panel:u}=f,ge=()=>{const[i,c]=b.useState(null),y=Y(),l=(n,j)=>{navigator.clipboard.writeText(n),c(j),X.success("已复制到剪贴板"),setTimeout(()=>c(null),2e3)},_="pip install bigmodel-sdk",I=`from bigmodel_sdk import BigModelClient

# 使用API密钥初始化客户端
client = BigModelClient(
    api_key="YOUR_API_KEY",
    base_url="https://api.example.com"
)`,k=`import asyncio
from bigmodel_sdk import AsyncBigModelClient

# 使用API密钥初始化异步客户端
client = AsyncBigModelClient(
    api_key="YOUR_API_KEY",
    base_url="https://api.example.com"
)`,v=`response = client.chat.completions.create(
  model="qwen-7b",
  messages=[
    {"role": "system", "content": "你是一个有帮助的助手。"},
    {"role": "user", "content": "介绍一下人工智能的发展历程"}
  ],
  temperature=0.7,
  max_tokens=1024,
  top_p=1,
  frequency_penalty=0,
  presence_penalty=0
)`,D=`response = client.chat.completions.create(
  model="qwen-7b",
  messages=[
    {"role": "user", "content": "写一篇关于人工智能未来的文章"}
  ],
  stream=True
)

for chunk in response:
  if chunk.choices[0].delta.content:
    print(chunk.choices[0].delta.content, end="", flush=True)`,w=`import asyncio

async def async_chat():
  response = await client.chat.completions.create(
    model="qwen-7b",
    messages=[
      {"role": "user", "content": "Python的异步编程有什么优势？"}
    ]
  )
  return response.choices[0].message.content

# 运行异步函数
result = asyncio.run(async_chat())
print(result)`,C=`# 单个文本嵌入
response = client.embeddings.create(
  model="text-embedding-ada-002",
  input="人工智能是计算机科学的一个分支"
)

# 多个文本嵌入
response = client.embeddings.create(
  model="text-embedding-ada-002",
  input=["文本1", "文本2", "文本3"]
)`,A=`# 列出所有模型
models = client.models.list()

for model in models.data:
  print(f"模型ID: {model.id}, 创建时间: {model.created}")`,T=`# 获取指定模型信息
model = client.models.retrieve("qwen-7b")
print(f"模型ID: {model.id}, 所有者: {model.owned_by}")`,P=`# 上传文件
with open("training_data.jsonl", "rb") as file:
  uploaded_file = client.files.create(
    file=file,
    purpose="fine-tune"
  )

print(f"文件ID: {uploaded_file.id}")`,F=`# 列出所有文件
files = client.files.list()
for file in files.data:
  print(f"文件ID: {file.id}, 文件名: {file.filename}")`,S=`# 删除文件
deleted_file = client.files.delete("file-abc123")
print(f"文件已删除: {deleted_file.deleted}")`,L=`# 创建微调任务
fine_tune = client.fine_tuning.jobs.create(
  training_file="file-abc123",
  model="qwen-7b",
  hyperparameters={
    "n_epochs": 2
  }
)

print(f"微调任务ID: {fine_tune.id}")`,B=`# 列出微调任务
jobs = client.fine_tuning.jobs.list()
for job in jobs.data:
  print(f"任务ID: {job.id}, 状态: {job.status}")`,R=`# 获取微调任务信息
job = client.fine_tuning.jobs.retrieve("ft-job-123")
print(f"任务状态: {job.status}, 模型: {job.model}")`,M=`from bigmodel_sdk import BigModelError

try:
  response = client.chat.completions.create(
    model="non-existent-model",
    messages=[{"role": "user", "content": "Hello"}]
  )
except BigModelError as e:
  print(f"API错误: {e.status_code} - {e.message}")
except Exception as e:
  print(f"其他错误: {str(e)}")`,$=[{name:"BigModelClient",description:"用于与大模型服务交互的同步客户端",methods:[{name:"__init__",signature:'__init__(self, api_key: str, base_url: str = "https://api.example.com")',description:"初始化客户端",parameters:[{name:"api_key",type:"str",description:"API密钥"},{name:"base_url",type:"str",description:"API基础URL"}]}]},{name:"AsyncBigModelClient",description:"用于与大模型服务交互的异步客户端",methods:[{name:"__init__",signature:'__init__(self, api_key: str, base_url: str = "https://api.example.com")',description:"初始化异步客户端",parameters:[{name:"api_key",type:"str",description:"API密钥"},{name:"base_url",type:"str",description:"API基础URL"}]}]},{name:"chat.completions",description:"聊天补全相关接口",methods:[{name:"create",signature:"create(self, *, model: str, messages: List[Dict], temperature: float = None, top_p: float = None, n: int = None, stream: bool = False, stop: Union[str, List[str]] = None, max_tokens: int = None, presence_penalty: float = None, frequency_penalty: float = None, user: str = None) -> Union[ChatCompletion, Iterator[ChatCompletionChunk]]",description:"创建聊天补全",parameters:[{name:"model",type:"str",description:"要使用的模型ID"},{name:"messages",type:"List[Dict]",description:"对话消息历史"},{name:"temperature",type:"float",description:"采样温度，控制输出随机性，范围0-2，默认1"},{name:"top_p",type:"float",description:"核采样参数，范围0-1，默认1"},{name:"n",type:"int",description:"为每条输入消息生成多少个聊天完成选项，默认1"},{name:"stream",type:"bool",description:"是否启用流式输出，默认False"},{name:"stop",type:"Union[str, List[str]]",description:"停止生成的标识符"},{name:"max_tokens",type:"int",description:"生成的最大token数"},{name:"presence_penalty",type:"float",description:"存在惩罚，范围-2.0到2.0，默认0"},{name:"frequency_penalty",type:"float",description:"频率惩罚，范围-2.0到2.0，默认0"},{name:"user",type:"str",description:"用户唯一标识符，用于内容审核"}],returns:"Union[ChatCompletion, Iterator[ChatCompletionChunk]]"}]},{name:"embeddings",description:"嵌入向量相关接口",methods:[{name:"create",signature:"create(self, *, model: str, input: Union[str, List[str]], user: str = None) -> Embedding",description:"创建文本嵌入向量",parameters:[{name:"model",type:"str",description:"要使用的模型ID"},{name:"input",type:"Union[str, List[str]]",description:"输入文本或文本数组"},{name:"user",type:"str",description:"用户唯一标识符"}],returns:"Embedding"}]},{name:"models",description:"模型管理相关接口",methods:[{name:"list",signature:"list(self) -> ModelList",description:"列出所有可用模型",parameters:[],returns:"ModelList"},{name:"retrieve",signature:"retrieve(self, model: str) -> Model",description:"获取指定模型信息",parameters:[{name:"model",type:"str",description:"模型ID"}],returns:"Model"}]},{name:"files",description:"文件管理相关接口",methods:[{name:"create",signature:"create(self, file: BinaryIO, purpose: str) -> FileObject",description:"上传文件",parameters:[{name:"file",type:"BinaryIO",description:"要上传的文件对象"},{name:"purpose",type:"str",description:'文件用途（如"fine-tune"）'}],returns:"FileObject"},{name:"list",signature:"list(self) -> FileList",description:"列出文件",parameters:[],returns:"FileList"},{name:"delete",signature:"delete(self, file_id: str) -> DeleteFileResponse",description:"删除文件",parameters:[{name:"file_id",type:"str",description:"文件ID"}],returns:"DeleteFileResponse"}]},{name:"fine_tuning.jobs",description:"微调任务相关接口",methods:[{name:"create",signature:"create(self, *, training_file: str, model: str, validation_file: str = None, hyperparameters: Dict = None, suffix: str = None) -> FineTuningJob",description:"创建微调任务",parameters:[{name:"training_file",type:"str",description:"训练文件ID"},{name:"model",type:"str",description:"要微调的模型ID"},{name:"validation_file",type:"str",description:"验证文件ID"},{name:"hyperparameters",type:"Dict",description:"超参数设置"},{name:"suffix",type:"str",description:"微调模型名称后缀"}],returns:"FineTuningJob"},{name:"list",signature:"list(self) -> FineTuningJobList",description:"列出微调任务",parameters:[],returns:"FineTuningJobList"},{name:"retrieve",signature:"retrieve(self, fine_tuning_job_id: str) -> FineTuningJob",description:"获取微调任务信息",parameters:[{name:"fine_tuning_job_id",type:"str",description:"微调任务ID"}],returns:"FineTuningJob"}]}],q=[{type:"ChatCompletion",fields:[{name:"id",type:"str",description:"响应ID"},{name:"object",type:"str",description:"对象类型"},{name:"created",type:"int",description:"创建时间戳"},{name:"model",type:"str",description:"使用的模型ID"},{name:"choices",type:"List[Choice]",description:"生成结果列表"},{name:"usage",type:"Usage",description:"token使用情况"}]},{type:"Embedding",fields:[{name:"object",type:"str",description:"对象类型"},{name:"data",type:"List[EmbeddingData]",description:"嵌入向量数据列表"},{name:"model",type:"str",description:"使用的模型ID"},{name:"usage",type:"Usage",description:"token使用情况"}]},{type:"Model",fields:[{name:"id",type:"str",description:"模型ID"},{name:"object",type:"str",description:"对象类型"},{name:"created",type:"int",description:"创建时间戳"},{name:"owned_by",type:"str",description:"模型所有者"}]}];return e.jsx("div",{style:{padding:"24px"},children:e.jsxs(a,{children:[e.jsxs(r,{level:2,children:[e.jsx(G,{})," Python SDK API 文档"]}),e.jsx(o,{children:"本文档详细介绍了大模型服务与应用开发平台提供的 Python SDK API 接口。"}),e.jsx(W,{message:"提示",description:e.jsxs("div",{children:["如需查看 SDK 使用指南，请访问",e.jsx(d,{type:"link",onClick:()=>y("/development_doc/sub/sdkDoc"),icon:e.jsx(ne,{}),children:"SDK 使用指南"})]}),type:"info",showIcon:!0,style:{marginBottom:"24px"}}),e.jsx(p,{}),e.jsxs(z,{direction:"vertical",style:{width:"100%"},children:[e.jsx(r,{level:3,children:"安装 SDK"}),e.jsx(o,{children:"首先，使用 pip 安装我们的 Python SDK："}),e.jsxs(a,{size:"small",children:[e.jsx(o,{style:{fontFamily:"monospace"},children:_}),e.jsx(d,{type:"primary",icon:i==="install-command"?e.jsx(x,{}):e.jsx(h,{}),onClick:()=>l(_,"install-command"),size:"small",children:i==="install-command"?"已复制":"复制"})]}),e.jsx(r,{level:3,children:"SDK 初始化"}),e.jsxs(O,{defaultActiveKey:"sync",children:[e.jsx(U,{tab:"同步客户端",children:e.jsxs(a,{size:"small",children:[e.jsx("pre",{style:{fontFamily:"monospace",whiteSpace:"pre-wrap",marginBottom:"10px"},children:I}),e.jsx(d,{type:"primary",icon:i==="sdk-init"?e.jsx(x,{}):e.jsx(h,{}),onClick:()=>l(I,"sdk-init"),children:i==="sdk-init"?"已复制":"复制代码"})]})},"sync"),e.jsx(U,{tab:"异步客户端",children:e.jsxs(a,{size:"small",children:[e.jsx("pre",{style:{fontFamily:"monospace",whiteSpace:"pre-wrap",marginBottom:"10px"},children:k}),e.jsx(d,{type:"primary",icon:i==="async-sdk-init"?e.jsx(x,{}):e.jsx(h,{}),onClick:()=>l(k,"async-sdk-init"),children:i==="async-sdk-init"?"已复制":"复制代码"})]})},"async")]}),e.jsx(p,{}),e.jsx(r,{level:3,children:"API 类参考"}),e.jsx(f,{children:$.map((n,j)=>e.jsxs(u,{header:e.jsx(s,{strong:!0,children:n.name}),children:[e.jsx(o,{children:n.description}),e.jsx(r,{level:4,children:"方法"}),e.jsx(f,{children:n.methods.map((t,J)=>e.jsxs(u,{header:e.jsxs(z,{children:[e.jsx(s,{code:!0,children:t.name}),e.jsx(s,{type:"secondary",children:t.signature})]}),children:[e.jsx(o,{children:t.description}),t.parameters.length>0&&e.jsxs(e.Fragment,{children:[e.jsx(r,{level:5,children:"参数"}),e.jsx(K,{dataSource:t.parameters,columns:[{title:"参数名",dataIndex:"name",key:"name"},{title:"类型",dataIndex:"type",key:"type"},{title:"描述",dataIndex:"description",key:"description"}],pagination:!1,rowKey:"name",size:"small"})]}),t.returns&&e.jsxs(e.Fragment,{children:[e.jsx(r,{level:5,style:{marginTop:16},children:"返回值"}),e.jsx(o,{children:e.jsx(s,{code:!0,children:t.returns})})]}),e.jsx(r,{level:5,style:{marginTop:16},children:"示例代码"}),e.jsxs(a,{size:"small",children:[e.jsxs("pre",{style:{fontFamily:"monospace",whiteSpace:"pre-wrap",marginBottom:"10px"},children:[t.name==="create"&&n.name==="chat.completions"&&v,t.name==="create"&&n.name==="embeddings"&&C,t.name==="list"&&n.name==="models"&&A,t.name==="retrieve"&&n.name==="models"&&T,t.name==="create"&&n.name==="files"&&P,t.name==="list"&&n.name==="files"&&F,t.name==="delete"&&n.name==="files"&&S,t.name==="create"&&n.name==="fine_tuning.jobs"&&L,t.name==="list"&&n.name==="fine_tuning.jobs"&&B,t.name==="retrieve"&&n.name==="fine_tuning.jobs"&&R]}),e.jsx(d,{type:"primary",icon:i===`example-${n.name}-${t.name}`?e.jsx(x,{}):e.jsx(h,{}),onClick:()=>l(t.name==="create"&&n.name==="chat.completions"?v:t.name==="create"&&n.name==="embeddings"?C:t.name==="list"&&n.name==="models"?A:t.name==="retrieve"&&n.name==="models"?T:t.name==="create"&&n.name==="files"?P:t.name==="list"&&n.name==="files"?F:t.name==="delete"&&n.name==="files"?S:t.name==="create"&&n.name==="fine_tuning.jobs"?L:t.name==="list"&&n.name==="fine_tuning.jobs"?B:t.name==="retrieve"&&n.name==="fine_tuning.jobs"?R:"",`example-${n.name}-${t.name}`),children:i===`example-${n.name}-${t.name}`?"已复制":"复制代码"})]})]},`${j}-${J}`))})]},j))}),e.jsx(p,{}),e.jsx(r,{level:3,children:"返回值类型详情"}),e.jsx(f,{children:q.map((n,j)=>e.jsx(u,{header:e.jsx(s,{strong:!0,children:n.type}),children:e.jsx(K,{dataSource:n.fields,columns:[{title:"字段名",dataIndex:"name",key:"name"},{title:"类型",dataIndex:"type",key:"type"},{title:"描述",dataIndex:"description",key:"description"}],pagination:!1,rowKey:"name",size:"small"})},j))}),e.jsx(p,{}),e.jsx(r,{level:3,children:"流式处理"}),e.jsxs(a,{size:"small",children:[e.jsxs(o,{children:["当设置 ",e.jsx(s,{code:!0,children:"stream=True"})," 时，API会返回一个迭代器，可以逐块处理响应："]}),e.jsx("pre",{style:{fontFamily:"monospace",whiteSpace:"pre-wrap",marginBottom:"10px"},children:D}),e.jsx(d,{type:"primary",icon:i==="stream-example"?e.jsx(x,{}):e.jsx(h,{}),onClick:()=>l(D,"stream-example"),children:i==="stream-example"?"已复制":"复制代码"})]}),e.jsx(r,{level:3,style:{marginTop:16},children:"异步调用"}),e.jsxs(a,{size:"small",children:[e.jsx(o,{children:"使用异步客户端可以实现非阻塞调用："}),e.jsx("pre",{style:{fontFamily:"monospace",whiteSpace:"pre-wrap",marginBottom:"10px"},children:w}),e.jsx(d,{type:"primary",icon:i==="async-example"?e.jsx(x,{}):e.jsx(h,{}),onClick:()=>l(w,"async-example"),children:i==="async-example"?"已复制":"复制代码"})]}),e.jsx(p,{}),e.jsx(r,{level:3,children:"错误处理"}),e.jsxs(o,{children:["SDK使用标准的异常处理机制。所有API错误都会抛出",e.jsx(s,{code:!0,children:"BigModelError"}),"异常："]}),e.jsxs(a,{size:"small",children:[e.jsx("pre",{style:{fontFamily:"monospace",whiteSpace:"pre-wrap",marginBottom:"10px"},children:M}),e.jsx(d,{type:"primary",icon:i==="error-handling"?e.jsx(x,{}):e.jsx(h,{}),onClick:()=>l(M,"error-handling"),children:i==="error-handling"?"已复制":"复制代码"})]}),e.jsx(r,{level:4,style:{marginTop:16},children:"常见错误码"}),e.jsxs(Q,{gutter:16,children:[e.jsx(E,{span:12,children:e.jsx(a,{size:"small",children:e.jsxs(m,{column:1,size:"small",children:[e.jsx(m.Item,{label:"400 Bad Request",children:"请求参数错误或缺失必要参数"}),e.jsx(m.Item,{label:"401 Unauthorized",children:"缺少有效的 API 密钥或密钥无效"}),e.jsx(m.Item,{label:"404 Not Found",children:"请求的资源不存在"})]})})}),e.jsx(E,{span:12,children:e.jsx(a,{size:"small",children:e.jsxs(m,{column:1,size:"small",children:[e.jsx(m.Item,{label:"429 Too Many Requests",children:"请求过于频繁，超出速率限制"}),e.jsx(m.Item,{label:"500 Internal Server Error",children:"服务器内部错误"}),e.jsx(m.Item,{label:"503 Service Unavailable",children:"服务暂时不可用"})]})})})]}),e.jsx(p,{}),e.jsx(r,{level:3,children:"最佳实践"}),e.jsxs(f,{children:[e.jsx(u,{header:"性能优化建议",children:e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx(s,{strong:!0,children:"连接复用："}),"在应用程序中复用客户端实例，避免重复创建连接"]}),e.jsxs("li",{children:[e.jsx(s,{strong:!0,children:"合理设置超时："}),"根据实际需求设置合适的超时时间，避免长时间等待"]}),e.jsxs("li",{children:[e.jsx(s,{strong:!0,children:"批量处理："}),"对于大量数据处理任务，考虑使用批量处理方式"]}),e.jsxs("li",{children:[e.jsx(s,{strong:!0,children:"错误重试："}),"实现合理的重试机制，处理临时性错误"]})]})},"1"),e.jsx(u,{header:"安全建议",children:e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx(s,{strong:!0,children:"密钥管理："}),"不要将 API 密钥硬编码在代码中，使用环境变量或配置文件"]}),e.jsxs("li",{children:[e.jsx(s,{strong:!0,children:"访问控制："}),"为不同的应用创建不同的 API 密钥，并设置适当的权限"]}),e.jsxs("li",{children:[e.jsx(s,{strong:!0,children:"日志记录："}),"避免在日志中记录敏感信息，如 API 密钥"]})]})},"2"),e.jsx(u,{header:"资源管理",children:e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx(s,{strong:!0,children:"及时清理："}),"删除不再需要的文件和微调模型，释放资源"]}),e.jsxs("li",{children:[e.jsx(s,{strong:!0,children:"监控使用："}),"定期检查 API 使用情况，避免超出配额"]})]})},"3")]}),e.jsx(p,{}),e.jsx(r,{level:3,children:"获取帮助"}),e.jsx(o,{children:"如果在使用 SDK 过程中遇到问题，可以通过以下方式获取帮助："}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx(s,{strong:!0,children:"官方文档："}),e.jsx(N,{href:"https://docs.example.com/sdk/python",target:"_blank",children:"https://docs.example.com/sdk/python"})]}),e.jsxs("li",{children:[e.jsx(s,{strong:!0,children:"GitHub 仓库："}),e.jsx(N,{href:"https://github.com/example/bigmodel-sdk-python",target:"_blank",children:"https://github.com/example/bigmodel-sdk-python"})]}),e.jsxs("li",{children:[e.jsx(s,{strong:!0,children:"技术支持："}),"联系我们的技术支持团队 support@example.com"]})]})]})]})})};export{ge as default};

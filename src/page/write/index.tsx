import React, { useState, useCallback, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./index.less";
import MyIcon from "../../components/MyIcon";
import { marked } from "marked";
import { Input, Button, message, Popover } from "antd";
import { debounce } from "lodash-es";
import { createArticle, editArticle, getArticleById } from "../../api/aricle";
function Write() {
  let [previewContent, setPreviewContent] = useState("");
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  let { id } = useParams();
  useEffect(() => {
    if (id != "new") {
      // 获取该文章渲染到页面
      getArticleByIdService(id as string);
    }
  }, []);

  const getArticleByIdService = async (id: string) => {
    const data = await getArticleById(id);
    const item = data[0];
    setTitle(item.title);
    setContent(item.content);
    const value = marked(item.content, { breaks: true });
    contentRef!.current!.innerText = item.content;
    setPreviewContent(value);
    return data;
  };
  // 创建草稿
  const handleCreateArticle = async (title: any, previewContent: any) => {
    const data = await createArticle({
      title,
      content: previewContent,
    });
    return data;
  };

  // 页面内容被编辑后保存文章
  useEffect(() => {
    setLoading(true);
    saveDraft(title, content);
  }, [title, content]);

  // save
  const saveDraft = useCallback(
    debounce(async function (title, content) {
      // new article
      console.log(id);
      if (id === "new") {
        const data = await handleCreateArticle(title, content);
        id = data.id;
        navigate("/write/" + data.id);
        setLoading(false);
      } else {
        // edit article
        const data = await editArticle({
          id,
          title,
          content: content,
        });
        setLoading(false);
      }
    }, 2000),
    []
  );

  // event_content_change
  const onContentChange = (e: any) => {
    const value = marked(e.target.innerText, { breaks: true });
    setContent(e.target.innerText);
    setPreviewContent(value);
  };

  // event_title_change
  const handleChangeTitle = (e: any) => {
    setTitle(e.target.value);
  };

  // event_save
  const handleSave = async () => {
    if (!title) {
      message.warning("未填写标题！");
      return;
    }
    if (!previewContent) {
      message.warning("未填写正文");
      return;
    }
    const data = await editArticle({
      id,
      status: 1,
    });
  };

  const popoverContent = (
    <>
      <div>标签：</div>
      <Button onClick={handleSave}>确定并发布</Button>
    </>
  );
  return (
    <div className="container">
      <div className="top">
        <Input
          placeholder="请输入标题"
          className="title-input"
          bordered={false}
          size="large"
          value={title}
          onChange={(e) => handleChangeTitle(e)}
        ></Input>
        <div className="btn">
          <span className="state">{loading ? "保存中..." : "保存成功"}</span>
          <Popover
            placement={"bottomRight"}
            title="发布文章"
            content={popoverContent}
            trigger={"click"}
          >
            <Button type={"primary"}>发布</Button>
          </Popover>
        </div>
      </div>
      <div className="toolbar">
        <div className="left">
          <MyIcon type="icon-header1"></MyIcon>
          <MyIcon type="icon-header2"></MyIcon>
          <MyIcon type="icon-header3"></MyIcon>
          <MyIcon type="icon-header4"></MyIcon>
          <MyIcon type="icon-Bold"></MyIcon>
          <MyIcon type="icon-italic"></MyIcon>
          <MyIcon type="icon-link"></MyIcon>
          <MyIcon type="icon-list-point"></MyIcon>
          <MyIcon type="icon-list-number"></MyIcon>
          <MyIcon type="icon-withdrawn"></MyIcon>
          <MyIcon type="icon-next"></MyIcon>
        </div>
        <div className="right"></div>
      </div>
      <div className="panel">
        <div
          ref={contentRef}
          className="left"
          contentEditable="true"
          onInput={onContentChange}
        ></div>
        <div
          className="right"
          dangerouslySetInnerHTML={{ __html: previewContent }}
        ></div>
      </div>
    </div>
  );
}
export default Write;

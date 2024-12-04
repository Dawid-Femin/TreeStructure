import { useState, FC } from "react";
import Arrow from "../../assets/icons/Arrow.tsx";
import HomeIcon from "@mui/icons-material/Home";

interface TreeNodeData {
  areaId: number | null;
  name: string;
  children?: TreeNodeData[];
}

const currentId = 3;

const treeData: TreeNodeData[] = [
  {
    areaId: null,
    name: "Benefit Systems S.A.",
    children: [
      {
        areaId: 2,
        name: "Benefit Systems",
        children: [
          {
            areaId: 3,
            name: "Technology",
            children: [
              {
                areaId: 4,
                name: "IT & Administration",
                children: [
                  { areaId: 5, name: "Administration center", children: [] },
                  { areaId: 6, name: "IT center", children: [] },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

type TreeNodeProps = {
  node: TreeNodeData;
};

const TreeNode: FC<TreeNodeProps> = ({ node }) => {
  const [expanded, setExpanded] = useState(true);

  const hasChildren = node.children && node.children.length > 0;
  const isCurrentNode = node.areaId === currentId;

  const toggleExpanded = () => {
    if (hasChildren) setExpanded(!expanded);
  };

  const styles = {
    node: {
      display: "flex",
      alignItems: "center",
      userSelect: "none",
      padding: "16px",
      color: isCurrentNode ? "#036BAE" : "inherit",
    },
    arrow: {
      padding: "9px 7px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      transform: expanded ? "rotate(360deg)" : "rotate(270deg)",
      transition: "transform 0.3s ease",
      opacity: hasChildren ? 1 : 0,
      cursor: hasChildren ? "pointer" : "default",
    },
    childContainer: {
      overflow: "hidden",
      transition: "max-height 0.3s ease, opacity 0.3s ease",
      maxHeight: expanded ? "1000px" : "0px",
      opacity: expanded ? 1 : 0,
      alignItems: "center",
      marginLeft: "32px",
    },
    iconAfterText: {
      paddingLeft: "8px",
      cursor: "pointer",
    },
    text: {
      cursor: hasChildren ? "pointer" : "default",
      paddingLeft: "16px",
    },
  };

  return (
    <>
      <div style={styles.node}>
        <span style={styles.arrow} onClick={toggleExpanded}>
          <Arrow />
        </span>
        <span style={styles.text} onClick={toggleExpanded}>
          {node.name}
        </span>
        {isCurrentNode && (
          <span style={styles.iconAfterText} onClick={toggleExpanded}>
            <HomeIcon />
          </span>
        )}
      </div>
      <div style={styles.childContainer}>
        {node.children &&
          node.children.map((child) => (
            <TreeNode key={child.areaId} node={child} />
          ))}
      </div>
    </>
  );
};

type TreeProps = {
  data: TreeNodeData[];
};

const Tree: FC<TreeProps> = ({ data }) => {
  return (
    <>
      {data.map((node) => (
        <TreeNode key={node.areaId} node={node} />
      ))}
    </>
  );
};

const App: FC = () => {
  return <Tree data={treeData} />;
};

export default App;

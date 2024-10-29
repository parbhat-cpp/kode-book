import { Octokit } from "@octokit/rest";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaCodeFork } from "react-icons/fa6";
import { MdGroup } from "react-icons/md";
import { Pie, PieChart, ResponsiveContainer, Sector } from "recharts";

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g className="sticky z-50">
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >
        {`${value} bytes`}
      </text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

interface RepoData {
  fork: number;
  stars: number;
  collaborators: number;
  languages: {
    [key: string]: string;
  };
}

const GithubStats = () => {
  const [repoData, setRepoData] = useState<RepoData>({
    fork: 0,
    stars: 0,
    collaborators: 0,
    languages: {},
  });

  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    async function getRepoStats() {
      const octokit = new Octokit({
        auth: import.meta.env.VITE_GITHUB_TOKEN,
      });

      const repoResponse = await octokit.rest.repos.get({
        owner: "parbhat-cpp",
        repo: "kode-book",
      });

      const repoCollaborators = await fetch(
        "https://api.github.com/repos/parbhat-cpp/kode-book/collaborators",
        {
          method: "GET",
          headers: {
            Accept: "application/vnd.github+json",
            Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
            "X-GitHub-Api-Version": "2022-11-28",
          },
        }
      );

      const languages = await fetch(repoResponse.data.languages_url, {
        method: "GET",
      });

      const lang = await languages.json();

      const collaborators = await repoCollaborators.json();

      setRepoData({
        collaborators: collaborators?.length,
        fork: repoResponse.data.forks,
        languages: lang,
        stars: repoResponse.data.stargazers_count,
      });
    }

    getRepoStats();

    return () => {
      getRepoStats();
    };
  }, []);

  const onPieEnter = (_: unknown, index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="px-10">
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-5">
        <div className="flex items-center justify-center min-h-[150px]">
          <div className="grid gap-3 text-center">
            <div className="flex items-center gap-10 justify-center">
              <div className="flex justify-center">
                <FaCodeFork size={40} />
              </div>
              <div>
                <h2>{repoData.fork}</h2>
              </div>
            </div>
            <h4>Forks</h4>
          </div>
        </div>
        <div className="flex items-center justify-center min-h-[150px]">
          <div className="grid gap-3 text-center">
            <div className="flex items-center gap-10 justify-center">
              <div className="flex justify-center">
                <FaStar size={50} />
              </div>
              <div>
                <h2>{repoData.stars}</h2>
              </div>
            </div>
            <h4>Stars</h4>
          </div>
        </div>
        <div className="flex items-center justify-center min-h-[150px]">
          <div className="grid gap-3 text-center">
            <div className="flex items-center gap-10 justify-center">
              <div className="flex justify-center">
                <MdGroup size={50} />
              </div>
              <div>
                <h2>{repoData.collaborators}</h2>
              </div>
            </div>
            <h4>Collaborators</h4>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <ResponsiveContainer height={150}>
            <PieChart height={150} width={150}>
              <Pie
                data={Object.keys(repoData.languages)?.map((lang: string) => ({
                  name: lang,
                  value: repoData.languages[lang],
                  fill:
                    "#" +
                    (Math.random().toString(16) + "000000").substring(2, 8),
                }))}
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={60}
                innerRadius={40}
                fill="#8884d8"
                label
                onMouseEnter={onPieEnter}
              />
            </PieChart>
          </ResponsiveContainer>
          <h4>Languages</h4>
        </div>
      </div>
    </div>
  );
};

export default GithubStats;

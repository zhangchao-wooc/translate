import { useEffect } from "react";
import { ProForm, ProFormText, ProFormGroup } from "@ant-design/pro-components";
import { useLocalStorageState } from "ahooks";

function isObject(value: unknown): boolean {
  return Object.prototype.toString.call(value) === "[object Object]";
}

function capitalizeFirstLetter(str: string) {
  if (!str || typeof str !== "string") return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function addSpacesBetweenWords(text: string): string {
  // 使用正则匹配所有连续的非空白字符（单词）
  // 并在它们之间加入空格
  return text.replace(/([a-z])([A-Z])/g, '$1 $2');
}

type GroupProFormProps = {
  groupName?: string;
  data: Record<string, unknown>;
};
const GroupProForm = (props: GroupProFormProps) => {
  return (
    <ProFormGroup label={capitalizeFirstLetter(props?.groupName || "Group")}>
      {Object.keys(props?.data || {}).map((key: string) => {
        return (
          <ProFormText
          width="xl"
            name={[props?.groupName, key]}
            label={addSpacesBetweenWords(capitalizeFirstLetter(key))}
            key={key}
          />
        );
      })}
    </ProFormGroup>
  );
};

const SettingPage = () => {
  const [config, setConfig] = useLocalStorageState("config", {
    defaultValue: {},
  });
  const [initialValues, setInitialValues] = useLocalStorageState<
    Record<string, unknown>
  >("initialValues", { defaultValue: {} });

  useEffect(() => {
    setInitialValues(config);
    console.log('config update')
  }, [config]);

  console.log(config);

  return (
    <div>
      <ProForm
        name="validate_other"
        initialValues={initialValues}
        onValuesChange={(_, values) => {
          console.log('onValuesChange', values);
        }}
        onFinish={async (value) => {
            const newConfig = {
                ...config,
                ...value
            }
            setConfig(newConfig);
        }}
      >
        {Object.keys(initialValues).map((key: string) => {
          if (isObject(initialValues[key])) {
            return <GroupProForm data={initialValues[key]} groupName={key} />;
          }
          return (
            <ProFormText
              // width="md"
              name={key}
              label={addSpacesBetweenWords(capitalizeFirstLetter(key))}
              key={key}
            />
          );
        })}
      </ProForm>
    </div>
  );
};

export default SettingPage;

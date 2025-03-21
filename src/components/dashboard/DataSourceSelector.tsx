
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UploadedFile } from "@/types/file";

interface DataSourceSelectorProps {
  dataSources: UploadedFile[];
  selectedSource: string;
  onSelectSource: (sourceId: string) => void;
}

const DataSourceSelector = ({ 
  dataSources, 
  selectedSource, 
  onSelectSource 
}: DataSourceSelectorProps) => {
  return (
    <Select 
      value={selectedSource} 
      onValueChange={(value) => onSelectSource(value)}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a data source" />
      </SelectTrigger>
      <SelectContent>
        {dataSources.length > 0 ? (
          dataSources.map((source) => (
            <SelectItem key={source.id} value={source.id}>
              {source.filename} ({source.type})
            </SelectItem>
          ))
        ) : (
          <SelectItem value="no-sources" disabled>
            No data sources available
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  );
};

export default DataSourceSelector;

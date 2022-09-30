import DescriptorInterface from './Descriptor.interface';

export default interface StateInterface {
  descriptor: DescriptorInterface;
  updated_at: string;
  updated_by: string;
}

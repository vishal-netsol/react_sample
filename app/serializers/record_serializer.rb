class RecordSerializer < ActiveModel::Serializer
  attributes :id, :title, :date, :amount
end

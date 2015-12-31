class BlogSerializer < ActiveModel::Serializer
  attributes :id, :author, :content
end

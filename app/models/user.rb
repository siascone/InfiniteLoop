require 'open-uri'

class User < ApplicationRecord
  has_secure_password

  before_validation :ensure_session_token

  validates :username,
    length: { in: 3..30 },
    uniqueness: true,
    format: { without: URI::MailTo::EMAIL_REGEXP, message: "username can't be an email" }
  validates :email,
    length: { in: 6..255 },
    uniqueness: true,
    format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password,
    length: { in: 6..255 }, allow_nil: true
  validates :session_token,
    presence: true,
    uniqueness: true

  validate :ensure_photo

  before_validation :generate_default_pic

  has_one_attached :photo
  
  def generate_default_pic
    unless self.photo.attached?
      file = URI.open('https://infinite-loop-seeds.s3.us-west-1.amazonaws.com/default_pic.jpg')
      self.photo.attach(io: file, filename: 'default_pic.jpg')
    end
  end

  def ensure_photo
    unless self.photo.attached? 
      errors.add(:photo, 'Must be attached')
    end
  end

  def self.find_by_credentials(credential, password)
    user = nil

    if URI::MailTo::EMAIL_REGEXP.match?(credential)
      user = User.find_by(email: credential)
    else
      user = User.find_by(username: credential)
    end

    if user&.authenticate(password)
      return user
    end

    nil
  end

  def reset_session_token!
    self.session_token = generate_unique_session_token
    self.save!
    self.session_token
  end



  private

  def generate_unique_session_token
    while true
      token = SecureRandom.urlsafe_base64
      return token unless User.exists?(session_token: token)
    end
  end

  def ensure_session_token
    self.session_token ||= generate_unique_session_token
  end 

end


INSERT INTO storage.buckets (id, name, public) VALUES ('device-photos', 'device-photos', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('bill-uploads', 'bill-uploads', false);

CREATE POLICY "Users can upload device photos" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'device-photos' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Anyone can view device photos" ON storage.objects FOR SELECT USING (bucket_id = 'device-photos');
CREATE POLICY "Users can update own device photos" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'device-photos' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can delete own device photos" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'device-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can upload bills" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'bill-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can view own bills" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'bill-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can delete own bills" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'bill-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

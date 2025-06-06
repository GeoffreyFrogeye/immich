<script lang="ts">
  import UserPageLayout from '$lib/components/layouts/user-page-layout.svelte';
  import AddToAlbum from '$lib/components/photos-page/actions/add-to-album.svelte';
  import ArchiveAction from '$lib/components/photos-page/actions/archive-action.svelte';
  import ChangeDate from '$lib/components/photos-page/actions/change-date-action.svelte';
  import ChangeDescription from '$lib/components/photos-page/actions/change-description-action.svelte';
  import ChangeLocation from '$lib/components/photos-page/actions/change-location-action.svelte';
  import CreateSharedLink from '$lib/components/photos-page/actions/create-shared-link.svelte';
  import DeleteAssets from '$lib/components/photos-page/actions/delete-assets.svelte';
  import DownloadAction from '$lib/components/photos-page/actions/download-action.svelte';
  import FavoriteAction from '$lib/components/photos-page/actions/favorite-action.svelte';
  import SelectAllAssets from '$lib/components/photos-page/actions/select-all-assets.svelte';
  import TagAction from '$lib/components/photos-page/actions/tag-action.svelte';
  import AssetGrid from '$lib/components/photos-page/asset-grid.svelte';
  import AssetSelectControlBar from '$lib/components/photos-page/asset-select-control-bar.svelte';
  import ButtonContextMenu from '$lib/components/shared-components/context-menu/button-context-menu.svelte';
  import EmptyPlaceholder from '$lib/components/shared-components/empty-placeholder.svelte';
  import { AssetAction } from '$lib/constants';
  import { AssetInteraction } from '$lib/stores/asset-interaction.svelte';
  import { AssetStore } from '$lib/stores/assets-store.svelte';
  import { preferences } from '$lib/stores/user.store';
  import { mdiDotsVertical, mdiPlus } from '@mdi/js';
  import { onDestroy } from 'svelte';
  import { t } from 'svelte-i18n';
  import type { PageData } from './$types';

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();

  const assetStore = new AssetStore();
  void assetStore.updateOptions({ isFavorite: true });
  onDestroy(() => assetStore.destroy());

  const assetInteraction = new AssetInteraction();

  const handleEscape = () => {
    if (assetInteraction.selectionActive) {
      assetInteraction.clearMultiselect();
      return;
    }
  };
</script>

<!-- Multiselection mode app bar -->
{#if assetInteraction.selectionActive}
  <AssetSelectControlBar
    assets={assetInteraction.selectedAssets}
    clearSelect={() => assetInteraction.clearMultiselect()}
  >
    <FavoriteAction removeFavorite onFavorite={(assetIds) => assetStore.removeAssets(assetIds)} />
    <CreateSharedLink />
    <SelectAllAssets {assetStore} {assetInteraction} />
    <ButtonContextMenu icon={mdiPlus} title={$t('add_to')}>
      <AddToAlbum />
      <AddToAlbum shared />
    </ButtonContextMenu>
    <ButtonContextMenu icon={mdiDotsVertical} title={$t('menu')}>
      <DownloadAction menuItem />
      <ChangeDate menuItem />
      <ChangeDescription menuItem />
      <ChangeLocation menuItem />
      <ArchiveAction
        menuItem
        unarchive={assetInteraction.isAllArchived}
        onArchive={(assetIds) => assetStore.removeAssets(assetIds)}
      />
      {#if $preferences.tags.enabled}
        <TagAction menuItem />
      {/if}
      <DeleteAssets menuItem onAssetDelete={(assetIds) => assetStore.removeAssets(assetIds)} />
    </ButtonContextMenu>
  </AssetSelectControlBar>
{/if}

<UserPageLayout hideNavbar={assetInteraction.selectionActive} title={data.meta.title} scrollbar={false}>
  <AssetGrid
    enableRouting={true}
    {assetStore}
    {assetInteraction}
    removeAction={AssetAction.UNFAVORITE}
    onEscape={handleEscape}
  >
    {#snippet empty()}
      <EmptyPlaceholder text={$t('no_favorites_message')} />
    {/snippet}
  </AssetGrid>
</UserPageLayout>
